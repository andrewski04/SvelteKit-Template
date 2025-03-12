import { prisma } from '$lib/server/prisma';
import crypto from 'crypto';

export async function createMagicToken(
	email: string,
	deviceId: string
): Promise<{ token: string; otp: string }> {
	// Generate a secure random token
	const token = crypto.randomBytes(32).toString('hex');

	// Generate a 6-digit OTP code
	const otp = Math.floor(100000 + Math.random() * 900000).toString();

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
