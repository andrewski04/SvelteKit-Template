import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { createMagicToken } from '$lib/server/auth/magicToken';
import { sendMagicLink } from '$lib/server/mailer';
import { nanoid } from 'nanoid';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;

		if (!email) {
			return { success: false, error: 'Email is required' };
		}

		// Create or reuse a device identifier cookie
		let deviceId = cookies.get('device_id');
		if (!deviceId) {
			deviceId = nanoid();
			cookies.set('device_id', deviceId, {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				maxAge: 60 * 60 * 24 * 365 // 1 year
			});
		}

		const { token, otp } = await createMagicToken(email, deviceId);

		// Send magic link with OTP included
		await sendMagicLink(email, token, otp);

		// Redirect to check-email page
		throw redirect(303, `/auth/check-email?email=${encodeURIComponent(email)}`);
	}
};
