import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
	try {
		const users = await prisma.user.findMany();
		return { users };
	} catch {
		return {
			users: [],
			error: 'Error fetching users'
		};
	}
};
