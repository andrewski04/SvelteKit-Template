import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { findMagicTokenByToken } from '$lib/server/auth/magicToken';

export const load: PageServerLoad = async ({ url }) => {
	const token = url.searchParams.get('token');

	if (!token) {
		throw redirect(303, '/auth/login');
	}

	// Find the magic token
	const magicToken = await findMagicTokenByToken(token);

	if (!magicToken) {
		return { otp: null };
	}

	return { otp: magicToken.otp };
};
