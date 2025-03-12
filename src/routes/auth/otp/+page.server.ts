import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ url }) => {
	const token = url.searchParams.get('token');

	if (!token) {
		throw redirect(303, '/auth/login');
	}

	// Find the magic token
	const magicToken = await prisma.magicToken.findUnique({
		where: { token }
	});

	if (!magicToken || magicToken.used || new Date() > magicToken.expiresAt) {
		return { otp: null };
	}

	return { otp: magicToken.otp };
};
