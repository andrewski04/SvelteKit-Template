import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { findMagicTokenByToken } from '$lib/server/auth/magicToken';
import { authenticateUserWithMagicToken } from '$lib/server/auth/authService';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const token = url.searchParams.get('token');

	if (!token) {
		throw redirect(303, '/auth/login?error=invalid_token');
	}

	// device_id used to check if user is on the same device or should be shown the OTP page
	const deviceId = cookies.get('device_id');

	const magicToken = await findMagicTokenByToken(token);

	if (!magicToken) {
		throw redirect(303, '/auth/login?error=invalid_token');
	}

	// if on same device, authenticate user and redirect
	if (deviceId && deviceId === magicToken.deviceId) {
		const authResult = await authenticateUserWithMagicToken({
			email: magicToken.email,
			hashedMagicToken: magicToken.hashedToken,
			cookies,
			redirectTo: '/'
		});

		if (authResult.isErr()) {
			throw redirect(303, `/auth/login?error=${authResult.error.code}`);
		}

		throw redirect(303, authResult.unwrap().redirectTo);
	}

	throw redirect(303, `/auth/otp?token=${token}`);
};
