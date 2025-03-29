import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import {
	findActiveMagicTokenByEmail,
	findMagicTokenByEmailAndOtp
} from '$lib/server/auth/magicToken';
import { authenticateUserWithMagicToken } from '$lib/server/auth/authService';
import { validateEmail } from '$lib/util/validation';
import { setSessionTokenCookie } from '$lib/server/auth/session';

export const load: PageServerLoad = async ({ url }) => {
	const email = url.searchParams.get('email');

	if (!email || !validateEmail(email).isOk()) {
		throw redirect(303, '/auth/login');
	}

	const activeMagicToken = await findActiveMagicTokenByEmail(email);

	if (!activeMagicToken) {
		throw redirect(303, '/auth/login');
	}

	return { email };
};

// form for if user enters OTP rather than opening link on the same device
export const actions: Actions = {
	verifyOtp: async ({ cookies, request }) => {
		const formData = await request.formData();
		const otp = formData.get('otp') as string;
		const email = formData.get('email') as string;

		if (!otp || !email) {
			return { success: false, error: 'Email and verification code are required' };
		}

		const magicToken = await findMagicTokenByEmailAndOtp(email, otp);
		const deviceID = cookies.get('device_id');

		if (!magicToken || magicToken.deviceId !== deviceID) {
			return { success: false, error: 'Invalid or expired verification code' };
		}

		const authResult = await authenticateUserWithMagicToken({
			email,
			hashedMagicToken: magicToken.hashedToken,
			redirectTo: '/'
		});

		if (authResult.isErr()) {
			return { success: false, error: authResult.error.message };
		}

		const { redirectTo, token, expiresAt } = authResult.unwrap();
		setSessionTokenCookie({ cookies }, token, expiresAt);

		throw redirect(303, redirectTo);
	}
} satisfies Actions;
