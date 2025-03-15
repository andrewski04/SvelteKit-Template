import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { findMagicTokenByToken, generateOtp } from '$lib/server/auth/magicToken';

export const load: PageServerLoad = async ({ url }) => {
	const token = url.searchParams.get('token');

	if (!token) {
		throw redirect(303, '/auth/login?error=invalid_token');
	}

	const magicToken = await findMagicTokenByToken(token);

	if (!magicToken) {
		throw redirect(303, '/auth/login?error=invalid_token');
	}

	const otp = await generateOtp(token);

	if (otp.isErr()) {
		throw redirect(303, '/auth/login?error=invalid_token');
	}

	return { otp: otp.value };
};
