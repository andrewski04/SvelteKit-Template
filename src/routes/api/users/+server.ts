import type { RequestHandler } from './$types';
import prisma from '$lib/server/prisma';

// GET: Fetch users
export const GET: RequestHandler = async () => {
	try {
		const users = await prisma.user.findMany();
		return new Response(JSON.stringify(users), { status: 200 });
	} catch {
		return new Response('Error fetching users', { status: 500 });
	}
};
