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

// POST: Add a new user
export const POST: RequestHandler = async ({ request }) => {
	try {
		const formData = await request.formData();
		const name = formData.get('name') as string;

		if (!name) {
			return new Response('Missing fields', { status: 400 });
		}

		const newUser = await prisma.user.create({
			data: { name }
		});

		return new Response(JSON.stringify(newUser), { status: 201 });
	} catch {
		return new Response('Error adding user', { status: 500 });
	}
};
