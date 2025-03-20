import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import {
	findActiveMagicTokenByEmail,
	findMagicTokenByEmailAndOtp,
	invalidateMagicToken
} from '$lib/server/auth/magicToken';
import { createUserIfNotExists } from '$lib/server/auth/user';
import { createSession, setSessionTokenCookie } from '$lib/server/auth/session';
import { validateEmail } from '$lib/util/validation';

export const load: PageServerLoad = async ({ url }) => {
	const email = url.searchParams.get('email');

	if (!email || !validateEmail(email).isOk()) {
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

		await invalidateMagicToken(magicToken.hashedToken, true);

		const createUserResult = await createUserIfNotExists(email);
		if (createUserResult.isErr()) {
			return { success: false, error: createUserResult.error.message };
		}
		const { user } = createUserResult.unwrap();

		const sessionResult = await createSession(user.id);

		if (sessionResult.isErr()) {
			return { success: false, error: sessionResult.error.message };
		}

		setSessionTokenCookie(
			{ cookies },
			sessionResult.value.token,
			sessionResult.value.session.expiresAt
		);

		// device_id not needed after authentication
		cookies.delete('device_id', { path: '/' });

		// TODO: User should have `setup-complete` field to track this
		// A redirect handler should probably implemented, since this is used on every page handling auth.
		if (!user.firstName || !user.lastName) {
			throw redirect(303, '/user/account-setup');
		}

		throw redirect(303, '/');
	}
} satisfies Actions;
