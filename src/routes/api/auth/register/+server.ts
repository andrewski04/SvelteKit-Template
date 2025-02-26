import bcrypt from 'bcryptjs';
import prisma from '$lib/server/prisma';

export const POST = async ({ request }) => {
	try {
		const { name, email, password } = await request.json();

		if (!name || !email || !password) {
			return new Response('Missing fields', { status: 400 });
		}

		// Check if user already exists
		const existingUser = await prisma.user.findUnique({ where: { email } });
		if (existingUser) {
			return new Response('User already exists', { status: 400 });
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create user
		await prisma.user.create({
			data: { name, email, password: hashedPassword }
		});

		return new Response(JSON.stringify({ message: 'User created' }), { status: 201 });
	} catch {
		return new Response('Error creating user', { status: 500 });
	}
};
