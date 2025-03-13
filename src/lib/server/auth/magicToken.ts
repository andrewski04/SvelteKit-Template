import { prisma } from '$lib/server/prisma';
import crypto from 'crypto';

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
	// Generate a secure random token
	const token = crypto.randomBytes(32).toString('hex');

	const otpValue = crypto.randomBytes(3).readUIntBE(0, 3) % 1000000;
	const otp = otpValue.toString().padStart(6, '0');

	// Set expiration time (10 minutes from now)
	const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

	// Store the token, OTP, and device ID in the database (using token as ID)
	await prisma.magicToken.create({
		data: {
			token,
			otp,
			deviceId,
			email,
			expiresAt,
			used: false
		}
	});

	return { token, otp };
}

/**
 * Validates a magic token.
 *
 * @param token - The magic token to validate.
 * @param deviceId - The ID of the device requesting the token.
 * @param otp - The OTP code associated with the token.
 * @returns - An object indicating whether the token is valid and the associated email.
 */
export async function validateMagicToken(
	token: string,
	deviceId?: string,
	otp?: string
): Promise<{ isValid: boolean; email?: string }> {
	const magicToken = await prisma.magicToken.findUnique({
		where: { token }
	});

	if (!magicToken || magicToken.used || new Date() > magicToken.expiresAt) {
		return { isValid: false };
	}

	// Check device ID first (same browser flow)
	if (deviceId && magicToken.deviceId === deviceId) {
		// Mark token as used
		await prisma.magicToken.update({
			where: { token },
			data: { used: true }
		});
		return { isValid: true, email: magicToken.email };
	}

	// If device ID doesn't match, check OTP (different browser flow)
	if (otp && magicToken.otp === otp) {
		// Mark token as used
		await prisma.magicToken.update({
			where: { token },
			data: { used: true }
		});
		return { isValid: true, email: magicToken.email };
	}

	return { isValid: false };
}

/**
 * Finds a magic token by its token ID.
 *
 * @param token - The token to find.
 * @returns The magic token or null if not found or invalid.
 */
export async function findMagicTokenByToken(token: string) {
	const magicToken = await prisma.magicToken.findUnique({
		where: { token }
	});

	if (!magicToken || magicToken.used || new Date() > magicToken.expiresAt) {
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
			used: false,
			expiresAt: { gt: new Date() }
		}
	});
}

/**
 * Finds a magic token by email and OTP code.
 *
 * @param email - The email associated with the token.
 * @param otp - The OTP code to verify.
 * @returns The magic token or null if not found or invalid.
 */
export async function findMagicTokenByEmailAndOtp(email: string, otp: string) {
	return await prisma.magicToken.findFirst({
		where: {
			email,
			otp,
			used: false,
			expiresAt: { gt: new Date() }
		}
	});
}

/**
 * Marks a magic token as used.
 *
 * @param token - The token to mark as used.
 */
export async function markTokenAsUsed(token: string) {
	await prisma.magicToken.update({
		where: { token },
		data: { used: true }
	});
}
