import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import {
	findActiveMagicTokenByEmail,
	findMagicTokenByEmailAndOtp,
	invalidateMagicToken
} from '$lib/server/auth/magicToken';
import { createUserIfNotExists } from '$lib/server/auth/user';
import { createSession, setSessionTokenCookie } from '$lib/server/auth/session';

export const load: PageServerLoad = async ({ url }) => {
	const email = url.searchParams.get('email');

	if (!email) {
		throw redirect(303, '/auth/login');
	}

	// Check for active magic token
	const activeMagicToken = await findActiveMagicTokenByEmail(email);

	if (!activeMagicToken) {
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
		const magicToken = await findMagicTokenByEmailAndOtp(email, otp);

		if (!magicToken) {
			return { success: false, error: 'Invalid or expired verification code' };
		}

		await invalidateMagicToken(magicToken.token);

		// Find or create the user
		const user = await createUserIfNotExists(email);

		const { token, session } = await createSession(user.id);

		setSessionTokenCookie({ cookies }, token, session.expiresAt);

		// device_id not needed after authentication
		cookies.delete('device_id', { path: '/' });

		throw redirect(303, '/');
	}
};
