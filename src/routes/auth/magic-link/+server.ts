import { json, redirect } from '@sveltejs/kit';
import { validateMagicToken } from '$lib/server/magicToken';
import { generateSessionToken, createSession, setSessionTokenCookie } from '$lib/server/session';
import { prisma } from '$lib/server/prisma';

export async function GET(event) {
	const token = event.url.searchParams.get('token');
	if (!token) return json({ error: 'Invalid token' }, { status: 400 });

	const email = await validateMagicToken(token);
	if (!email) return json({ error: 'Token expired or invalid' }, { status: 400 });

	const user = await prisma.user.findUnique({ where: { email } });

	if (!user || user.firstName == null || user.lastName == null) {
		// Redirect new users to a setup page to collect first and last name
		event.cookies.set('pending_email', email, { httpOnly: true, path: '/' });
		return redirect(302, '/auth/setup');
	}

	// Log in existing user
	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, user.id);

	setSessionTokenCookie(event, sessionToken, session.expiresAt);

	return redirect(302, '/dashboard');
}
