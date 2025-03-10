import { json } from '@sveltejs/kit';
import { createMagicToken } from '$lib/server/magicToken';
import { sendMagicLink } from '$lib/server/mailer';

export async function POST({ request }) {
	const { email } = await request.json();
	if (!email) return json({ error: 'Email is required' }, { status: 400 });

	const token = await createMagicToken(email);
	await sendMagicLink(email, token);

	return json({ message: 'Magic link sent' });
}
