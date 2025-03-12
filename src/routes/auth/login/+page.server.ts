import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { createMagicToken } from '$lib/server/auth/magicToken';
import { sendMagicLink } from '$lib/server/mailer';
import { nanoid } from 'nanoid';

export const actions: Actions = {
	// handles email input for passwordless login
	// successful requests redirect to check-email page
	// failed requests return error message
	default: async ({ request, cookies, url }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;

		if (!email) {
			return { success: false, error: 'Email is required' };
		}

		// Create or reuse a device identifier cookie,
		// used to detect if magic link is opened on the same device
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

		const { token } = await createMagicToken(email, deviceId);

		const baseUrl = `${url.protocol}//${url.host}`;
		await sendMagicLink(email, token, baseUrl);

		throw redirect(303, `/auth/check-email?email=${encodeURIComponent(email)}`);
	}
};
