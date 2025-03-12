import { json, redirect } from '@sveltejs/kit';
import { validateMagicToken } from '$lib/server/auth/magicToken';
import {
	generateSessionToken,
	createSession,
	setSessionTokenCookie
} from '$lib/server/auth/session';
import { prisma } from '$lib/server/prisma';

export async function GET(event) {
	const token = event.url.searchParams.get('token');
	if (!token) return json({ error: 'Invalid token' }, { status: 400 });

	const deviceId = event.cookies.get('device_id');
	const result = await validateMagicToken(token, deviceId);

	if (!result.email) {
		return json({ error: 'Token expired or invalid' }, { status: 400 });
	}

	// If OTP is required, redirect to verification page
	if (result.requiresOTP && result.hashedToken) {
		event.cookies.set('pending_verification', result.hashedToken, {
			path: '/',
			httpOnly: true,
			maxAge: 60 * 10 // 10 minutes
		});
		event.cookies.set('pending_email', result.email, {
			path: '/',
			httpOnly: true,
			maxAge: 60 * 10 // 10 minutes
		});
		return redirect(302, '/auth/verify');
	}

	const user = await prisma.user.findUnique({ where: { email: result.email } });

	if (!user || user.firstName == null || user.lastName == null) {
		// Redirect new users to a setup page
		event.cookies.set('pending_email', result.email, { httpOnly: true, path: '/' });
		return redirect(302, '/auth/setup');
	}

	// Log in the user
	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, user.id);

	setSessionTokenCookie(event, sessionToken, session.expiresAt);

	return redirect(302, '/dashboard');
}
