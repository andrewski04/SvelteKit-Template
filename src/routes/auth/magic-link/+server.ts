import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { findMagicTokenByToken, invalidateMagicToken } from '$lib/server/auth/magicToken';
import { createUserIfNotExists } from '$lib/server/auth/user';
import { createSession, setSessionTokenCookie } from '$lib/server/auth/session';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const token = url.searchParams.get('token');

	if (!token) {
		throw redirect(303, '/auth/login?error=invalid_token');
	}

	// Get device ID from cookies
	const deviceId = cookies.get('device_id');

	// Find the magic token
	const magicToken = await findMagicTokenByToken(token);

	if (!magicToken) {
		throw redirect(303, '/auth/login?error=invalid_token');
	}

	// If same device ID, auto-authenticate
	if (deviceId && deviceId === magicToken.deviceId) {
		await invalidateMagicToken(magicToken.hashedToken, true);

		const createUserResult = await createUserIfNotExists(magicToken.email);
		if (createUserResult.isErr()) {
			throw redirect(303, `/auth/login?error=${createUserResult.error.code}`);
		}
		const { user } = createUserResult.unwrap();

		const sessionResult = await createSession(user.id);
		if (sessionResult.isErr()) {
			throw redirect(303, '/auth/login?error=session_error');
		}
		const { session, token } = sessionResult.unwrap();

		setSessionTokenCookie({ cookies }, token, session.expiresAt);

		cookies.delete('device_id', { path: '/' });

		// TODO: User should have `setup-complete` field to track this
		// A redirect handler should probably implemented, since this is used on every page handling auth.
		if (!user.firstName || !user.lastName) {
			throw redirect(303, '/user/account-setup');
		}

		throw redirect(303, '/');
	}

	// If different device, redirect to OTP display page
	throw redirect(303, `/auth/otp?token=${token}`);
};
