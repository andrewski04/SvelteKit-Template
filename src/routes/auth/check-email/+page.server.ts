import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import {
	findActiveMagicTokenByEmail,
	findMagicTokenByEmailAndOtp
} from '$lib/server/auth/magicToken';
import { authenticateUserWithMagicToken } from '$lib/server/auth/authService';
import { validateEmail } from '$lib/util/validation';

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

		if (!magicToken) {
			return { success: false, error: 'Invalid or expired verification code' };
		}

		const authResult = await authenticateUserWithMagicToken({
			email,
			hashedMagicToken: magicToken.hashedToken,
			cookies,
			redirectTo: '/'
		});

		if (authResult.isErr()) {
			return { success: false, error: authResult.error.message };
		}

		throw redirect(303, authResult.unwrap().redirectTo);
	}
} satisfies Actions;
