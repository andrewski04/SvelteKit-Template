import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { createSession, setSessionTokenCookie } from '$lib/server/auth/session';

export const load: PageServerLoad = async ({ url }) => {
	const email = url.searchParams.get('email');

	if (!email) {
		throw redirect(303, '/auth/login');
	}

	return { email };
};

export const actions: Actions = {
	verifyOtp: async ({ cookies, request }) => {
		const formData = await request.formData();
		const otp = formData.get('otp') as string;
		const email = formData.get('email') as string;

		if (!otp || !email) {
			return { success: false, error: 'Email and verification code are required' };
		}

		// Find the token by email and OTP
		const magicToken = await prisma.magicToken.findFirst({
			where: {
				email,
				otp,
				used: false,
				expiresAt: { gt: new Date() }
			}
		});

		if (!magicToken) {
			return { success: false, error: 'Invalid or expired verification code' };
		}

		// Mark token as used
		await prisma.magicToken.update({
			where: { token: magicToken.token },
			data: { used: true }
		});

		// Find or create the user
		let user = await prisma.user.findUnique({ where: { email } });

		if (!user) {
			user = await prisma.user.create({
				data: { email }
			});
		}

		const { token, session } = await createSession(user.id);

		setSessionTokenCookie({ cookies }, token, session.expiresAt);

		throw redirect(303, '/dashboard');
	}
};
