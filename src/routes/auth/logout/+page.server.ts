import type { PageServerLoad } from './$types';
import { invalidateSession } from '$lib/server/auth/session';

export const load: PageServerLoad = async ({ cookies }) => {
	const sessionToken = cookies.get('session_token');

	if (!sessionToken) {
		return {
			wasLoggedIn: false
		};
	}

	// Invalidate the session using the session library
	await invalidateSession(sessionToken);

	// Clear the session cookie
	cookies.delete('session_token', { path: '/' });

	return {
		wasLoggedIn: true
	};
};
