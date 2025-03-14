import { prisma } from '$lib/server/prisma';
import type { User } from '@prisma/client';
import { validateEmail } from '$lib/validation';

/**
 * Finds a user by their email address.
 *
 * @param email - The email address to search for.
 * @returns The user or null if not found.
 */
export async function findUserByEmail(email: string) {
	return await prisma.user.findUnique({
		where: { email }
	});
}

/**
 * Creates a user if they don't already exist.
 *
 * @param email - The email address of the user.
 * @returns The existing or newly created user.
 */
export async function createUserIfNotExists(
	email: string
): Promise<{ user: User } | { error: string }> {
	if (!email || !validateEmail(email).valid) {
		return { error: 'Invalid email' };
	}

	let user = await findUserByEmail(email);

	if (!user) {
		user = await prisma.user.create({
			data: { email }
		});
	}

	return { user };
}
