import { prisma } from './prisma.js';
import { encodeBase32LowerCaseNoPadding } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';

export function generateMagicToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	return encodeBase32LowerCaseNoPadding(bytes);
}

export async function createMagicToken(email: string): Promise<string> {
	const token = generateMagicToken();
	const hashedToken = encodeBase32LowerCaseNoPadding(sha256(new TextEncoder().encode(token)));

	await prisma.magicToken.create({
		data: {
			email,
			token: hashedToken,
			expiresAt: new Date(Date.now() + 1000 * 60 * 10) // Expires in 10 mins
		}
	});

	return token;
}

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
