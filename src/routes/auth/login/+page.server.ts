import { fail, type Actions } from '@sveltejs/kit';
import { createMagicToken } from '$lib/server/magicToken';
import { sendMagicLink } from '$lib/server/mailer';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;

		if (!email) {
			return fail(400, { success: false, error: 'Email is required' });
		}

		const token = await createMagicToken(email);
		await sendMagicLink(email, token);

		return { success: true, message: 'Magic link sent! Check your email.' };
	}
} satisfies Actions;
