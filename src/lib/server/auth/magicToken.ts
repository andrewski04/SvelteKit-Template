import { prisma } from '$lib/server/prisma';
import crypto from 'crypto';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeHexLowerCase } from '@oslojs/encoding';

/**
 * Creates a new magic token for the given email and device ID.
 *
 * @param email - The email associated with the token.
 * @param deviceId - The ID of the device requesting the token.
 * @returns - An object containing the token and OTP.
 */
export async function createMagicToken(
	email: string,
	deviceId: string
): Promise<{ token: string; otp: string }> {
	// generate magic token and hash for storage
	const token = crypto.randomBytes(32).toString('hex');
	const hashedToken = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

	// generate OTP and hash for storage
	const otpValue = crypto.randomBytes(3).readUIntBE(0, 3) % 1000000;
	const otp = otpValue.toString().padStart(6, '0');
	const hashedOtp = encodeHexLowerCase(sha256(new TextEncoder().encode(otp)));

	// Set expiration time (10 minutes from now)
	const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

	// Store the token, OTP, and device ID in the database (using token as ID)
	await prisma.magicToken.create({
		data: {
			token: hashedToken,
			otp: hashedOtp,
			deviceId,
			email,
			expiresAt
		}
	});

	return { token, otp };
}

/**
 * Finds a magic token by its token ID.
 *
 * @param token - The raw token to find.
 * @returns The magic token or null if not found or invalid.
 */
export async function findMagicTokenByToken(token: string) {
	const hashedToken = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const magicToken = await prisma.magicToken.findUnique({
		where: { token: hashedToken }
	});

	if (!magicToken || new Date() > magicToken.expiresAt) {
		return null;
	}

	return magicToken;
}

/**
 * Finds an active magic token for a specific email.
 *
 * @param email - The email to search for.
 * @returns The active magic token or null if none found.
 */
export async function findActiveMagicTokenByEmail(email: string) {
	return await prisma.magicToken.findFirst({
		where: {
			email,
			expiresAt: { gt: new Date() }
		}
	});
}

/**
 * Finds a magic token by email and OTP code.
 *
 * @param email - The email associated with the token.
 * @param otp - The raw OTP code to verify.
 * @returns The magic token or null if not found or invalid.
 */
export async function findMagicTokenByEmailAndOtp(email: string, otp: string) {
	const hashedOtp = encodeHexLowerCase(sha256(new TextEncoder().encode(otp)));
	return await prisma.magicToken.findFirst({
		where: {
			email,
			otp: hashedOtp,
			expiresAt: { gt: new Date() }
		}
	});
}

/**
 * Marks a magic token as used.
 *
 * @param token - The raw token to mark as used.
 */
export async function invalidateMagicToken(token: string) {
	const hashedToken = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	await prisma.magicToken.delete({
		where: { token: hashedToken }
	});
}
