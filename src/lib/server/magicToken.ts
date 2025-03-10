import { prisma } from './prisma.js';
import { encodeBase32LowerCaseNoPadding } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';

// generate a new token
export function generateMagicToken(): string {
	const bytes = new Uint8Array(32);
	crypto.getRandomValues(bytes);
	return encodeBase32LowerCaseNoPadding(bytes);
}

// create and store a magic token for a specific user, used for one time login via link
export async function createMagicToken(email: string): Promise<string> {
	const token = generateMagicToken();
	const hashedToken = encodeBase32LowerCaseNoPadding(sha256(new TextEncoder().encode(token)));

	// Ensure the user exists before creating a magic token
	let user = await prisma.user.findUnique({ where: { email } });

	// create new user if non-existent
	if (!user) {
		user = await prisma.user.create({
			data: { email } // First and last name will be collected later
		});
	}

	await prisma.magicToken.create({
		data: {
			email,
			token: hashedToken,
			expiresAt: new Date(Date.now() + 1000 * 60 * 10) // Expires in 10 mins
		}
	});

	return token;
}

// validates a magic token and returns the users email, or "null" if expired/non-existant
export async function validateMagicToken(token: string): Promise<string | null> {
	const hashedToken = encodeBase32LowerCaseNoPadding(sha256(new TextEncoder().encode(token)));

	const magicToken = await prisma.magicToken.findUnique({
		where: { token: hashedToken }
	});

	if (!magicToken || magicToken.expiresAt < new Date()) {
		return null;
	}

	await prisma.magicToken.delete({ where: { token: hashedToken } });

	return magicToken.email;
}
