import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { validateOTP } from '$lib/server/auth/magicToken';
import {
	generateSessionToken,
	createSession,
	setSessionTokenCookie
} from '$lib/server/auth/session';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ cookies, url }) => {
	// Get email from query params or cookie
	const email = url.searchParams.get('email') || cookies.get('pending_email');

	if (!email) {
		throw redirect(302, '/auth/login');
	}

	// Store the email in a cookie for future use
	cookies.set('pending_email', email, {
		path: '/',
		httpOnly: true,
		maxAge: 60 * 10 // 10 minutes
	});

	return { email };
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const otp = formData.get('otp') as string;
		const email = cookies.get('pending_email');

		if (!email) {
			return fail(400, { error: 'Session expired. Please try again.' });
		}

		if (!otp || otp.length !== 6 || !/^\d+$/.test(otp)) {
			return fail(400, { error: 'Please enter a valid 6-digit verification code.' });
		}

		// Retrieve the latest magic token for this email
		const magicToken = await prisma.magicToken.findFirst({
			where: {
				email,
				expiresAt: { gt: new Date() }
			},
			orderBy: { expiresAt: 'desc' }
		});

		if (!magicToken || magicToken.otp !== otp) {
			return fail(400, { error: 'Invalid or expired verification code.' });
		}

		// Verification successful, delete the token
		await prisma.magicToken.delete({
			where: { token: magicToken.token }
		});

		// Clear verification cookie
		cookies.delete('pending_email', { path: '/' });

		// Find or create the user
		const user = await prisma.user.findUnique({ where: { email } });

		if (!user || user.firstName == null || user.lastName == null) {
			// Redirect new users to setup page
			cookies.set('pending_email', email, { httpOnly: true, path: '/' });
			throw redirect(302, '/auth/setup');
		}

		// Create session and log in
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, user.id);

		setSessionTokenCookie({ cookies }, sessionToken, session.expiresAt);

		// Return success momentarily before redirect
		return { success: true };
	}
};
