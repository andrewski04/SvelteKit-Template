import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/server/prisma';
import { createSession, setSessionTokenCookie } from '$lib/server/auth/session';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const magicTokenId = url.searchParams.get('token');

	if (!magicTokenId) {
		throw redirect(303, '/auth/login');
	}

	// Get device ID from cookies
	const deviceId = cookies.get('device_id');

	// Find the magic token
	const magicToken = await prisma.magicToken.findUnique({
		where: { token: magicTokenId }
	});

	if (!magicToken || magicToken.used || new Date() > magicToken.expiresAt) {
		throw redirect(303, '/auth/login?error=invalid_token');
	}

	// If same device ID, auto-authenticate
	if (deviceId && deviceId === magicToken.deviceId) {
		// Mark token as used
		await prisma.magicToken.update({
			where: { token: magicTokenId },
			data: { used: true }
		});

		// Find or create the user
		let user = await prisma.user.findUnique({ where: { email: magicToken.email } });

		if (!user) {
			user = await prisma.user.create({
				data: { email: magicToken.email }
			});
		}

		const { session, token } = await createSession(user.id);

		setSessionTokenCookie({ cookies }, token, session.expiresAt);

		cookies.delete('device_id', { path: '/' });
		throw redirect(303, '/dashboard');
	}

	// If different device, redirect to OTP display page
	throw redirect(303, `/auth/otp?token=${magicTokenId}`);
};
