import { prisma } from '../prisma.js';
import { encodeBase32LowerCaseNoPadding } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';

// generate a new OTP
// called when a magic link is not opened from the requesting device
function generateOTP(): string {
	const bytes = new Uint8Array(4);
	crypto.getRandomValues(bytes);
	const num = new DataView(bytes.buffer).getUint32(0) % 100000000;
	return num.toString().padStart(8, '0');
}

// generate the 32 bytes token used to identify a magic link
function generateMagicToken(): string {
	const bytes = new Uint8Array(32);
	crypto.getRandomValues(bytes);
	return encodeBase32LowerCaseNoPadding(bytes);
}

// create and store a magic token, used for one time login via link
export async function createMagicToken(
	email: string,
	deviceId?: string
): Promise<{ token: string; otp: string }> {
	const token = generateMagicToken();
	const hashedToken = encodeBase32LowerCaseNoPadding(sha256(new TextEncoder().encode(token)));
	const otp = generateOTP();

	await prisma.magicToken.create({
		data: {
			email,
			token: hashedToken,
			otp,
			deviceId,
			expiresAt: new Date(Date.now() + 1000 * 60 * 10) // Expires in 10 mins
		}
	});

	return { token, otp };
}

// validates a magic token and returns the users email, or "null" if expired/non-existant
export async function validateMagicToken(
	token: string,
	deviceId?: string
): Promise<{
	email: string | null;
	requiresOTP: boolean;
	hashedToken?: string;
}> {
	const hashedToken = encodeBase32LowerCaseNoPadding(sha256(new TextEncoder().encode(token)));

	const magicToken = await prisma.magicToken.findUnique({
		where: { token: hashedToken }
	});

	if (!magicToken || magicToken.expiresAt < new Date()) {
		return { email: null, requiresOTP: false };
	}

	// If device IDs match, allow direct login
	if (deviceId && magicToken.deviceId === deviceId) {
		await prisma.magicToken.delete({ where: { token: hashedToken } });
		return { email: magicToken.email, requiresOTP: false };
	}

	// Otherwise mark as verified but require OTP
	await prisma.magicToken.update({
		where: { token: hashedToken },
		data: { verified: true }
	});

	return { email: magicToken.email, requiresOTP: true, hashedToken };
}

// validate an OTP and return the users email, or "null" if expired/non-existant
export async function validateOTP(hashedToken: string, otp: string): Promise<string | null> {
	const magicToken = await prisma.magicToken.findUnique({
		where: { token: hashedToken }
	});

	if (!magicToken || magicToken.expiresAt < new Date() || magicToken.otp !== otp) {
		return null;
	}

	await prisma.magicToken.delete({ where: { token: hashedToken } });
	return magicToken.email;
}
