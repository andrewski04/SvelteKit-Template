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

		// Find or create the user
		const user = await createUserIfNotExists(magicToken.email);

		const { session, token } = await createSession(user.id);

		setSessionTokenCookie({ cookies }, token, session.expiresAt);

		cookies.delete('device_id', { path: '/' });
		throw redirect(303, '/');
	}

	// If different device, redirect to OTP display page
	throw redirect(303, `/auth/otp?token=${token}`);
};
