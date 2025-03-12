import { prisma } from '$lib/server/prisma';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import type { User, Session } from '@prisma/client';
import type { RequestEvent } from '@sveltejs/kit';

// API to manage user session tokens
// Session tokens are stored in cookies to authenticate users,
// not to be confused with magic tokens used for one time login

/**
 * Generates a new session token.
 *
 * @returns - The generated session token.
 */
function generateSessionToken(): string {
	const bytes = new Uint8Array(32);
	crypto.getRandomValues(bytes);
	return encodeBase32LowerCaseNoPadding(bytes);
}

/**
 * Creates a new session for the user, returning the session object and the token.
 *
 * Note that session ID is the hashed token, the returned token
 * should be used to set cookies as this will be forgotten by the server!
 *
 * @param userId - User ID to create session for.
 * @returns - An object containing the session object and the token.
 */
export async function createSession(userId: string): Promise<{ session: Session; token: string }> {
	const token = generateSessionToken();
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: Session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
	};
	await prisma.session.create({
		data: session
	});
	return { session, token };
}

/**
 * Validates a session token, returning the session object and the user object.
 *
 * @param token - The session token to validate.
 * @returns - An object containing the session object and the user object.
 */
export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const result = await prisma.session.findUnique({
		where: {
			id: sessionId
		},
		include: {
			user: true
		}
	});
	if (result === null) {
		return { session: null, user: null };
	}
	const { user, ...session } = result;
	if (Date.now() >= session.expiresAt.getTime()) {
		await prisma.session.delete({ where: { id: sessionId } });
		return { session: null, user: null };
	}
	if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
		session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
		await prisma.session.update({
			where: {
				id: session.id
			},
			data: {
				expiresAt: session.expiresAt
			}
		});
	}
	return { session, user };
}

/**
 * Invalidates a session by its ID.
 *
 * @param sessionId - The ID of the session to invalidate.
 */
export async function invalidateSession(sessionId: string): Promise<void> {
	await prisma.session.delete({ where: { id: sessionId } });
}

/**
 * Invalidates all sessions for a user.
 *
 * @param userId - The ID of the user to invalidate sessions for.
 */
export async function invalidateUserSessions(userId: string): Promise<void> {
	await prisma.session.deleteMany({ where: { userId } });
}

/**
 * Sets the session token cookie.
 *
 * @param event - The request event.
 * @param token - The session token.
 * @param expiresAt - The expiration date of the session.
 */
export function setSessionTokenCookie(
	event: { cookies: RequestEvent['cookies'] },
	token: string,
	expiresAt: Date
): void {
	event.cookies.set('session', token, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		expires: expiresAt
	});
}

/**
 * Deletes the session token cookie.
 *
 * @param event - The request event.
 */
export function deleteSessionTokenCookie(event: { cookies: RequestEvent['cookies'] }): void {
	event.cookies.delete('session', { path: '/' });
}

// properly type the return value of validateSessionToken
export interface SessionValidationResult {
	session: Session | null;
	user: User | null;
}
