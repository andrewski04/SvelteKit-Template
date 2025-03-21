import type { Cookies } from '@sveltejs/kit';
import { invalidateMagicToken } from '$lib/server/auth/magicToken';
import { createUserIfNotExists } from '$lib/server/auth/user';
import { createSession, setSessionTokenCookie } from '$lib/server/auth/session';
import { AppError, err, ok, type Result } from '$lib/util/error';

interface AuthenticateUserOptions {
	email: string;
	hashedMagicToken: string;
	cookies: Cookies;
	redirectTo: string;
}

interface AuthenticateUserResult {
	success: boolean;
	redirectTo: string;
}

/**
 * Handles authentication flow on pages such as `/auth/check-email` and `/auth/otp`.
 *
 * - Invalidates the magic token
 * - Creates or finds the user
 * - Creates a session
 * - Sets session cookies
 * - Handles redirect to user-setup if needed
 *
 * @param options - User's email, hashed magic token, cookies, and optional redirect URL.
 * @returns Result with error or success and redirect URL.
 *
 * @example
 * const result = await authenticateUser({
 *   email: 'john@doe.com',
 *   hashedMagicToken: 'hashed-token',
 *   cookies: event.cookies,
 *   redirectTo: '/dashboard'
 * });
 * if (result.isErr()) {
 *   // handle error
 * }
 * const { success, redirectTo } = result.unwrap();
 * if (success) {
 *   // redirect to dashboard
 * } else {
 *   // handle failure
 * }
 */
export async function authenticateUserWithMagicToken({
	email,
	hashedMagicToken,
	cookies,
	redirectTo = '/'
}: AuthenticateUserOptions): Promise<Result<AuthenticateUserResult>> {
	try {
		await invalidateMagicToken(hashedMagicToken, true);

		const createUserResult = await createUserIfNotExists(email);
		if (createUserResult.isErr()) {
			return createUserResult.unwrapErr();
		}
		const { user } = createUserResult.unwrap();

		const sessionResult = await createSession(user.id);
		if (sessionResult.isErr()) {
			return sessionResult.unwrapErr();
		}
		const { session, token } = sessionResult.unwrap();

		setSessionTokenCookie({ cookies }, token, session.expiresAt);

		cookies.delete('device_id', { path: '/' });

		if (!user.firstName || !user.lastName) {
			redirectTo = '/user/account-setup?redirect=' + encodeURIComponent(redirectTo);
		}

		return ok({
			success: true,
			redirectTo
		});
	} catch (error) {
		return err(
			new AppError(
				error instanceof Error ? error.message : 'Unknown authentication error',
				'ERR_AUTH_UNKNOWN'
			)
		);
	}
}
