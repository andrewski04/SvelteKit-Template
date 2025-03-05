import { SvelteKitAuth } from '@auth/sveltekit';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './prisma';
import Nodemailer from '@auth/sveltekit/providers/nodemailer';
import { env } from '$env/dynamic/private';
import type { Provider } from '@auth/sveltekit/providers';

const providers: Provider[] = [
	Nodemailer({
		server: {
			host: env.EMAIL_SERVER_HOST,
			port: Number(process.env.EMAIL_SERVER_PORT),
			auth: {
				user: env.EMAIL_SERVER_USER,
				pass: env.EMAIL_SERVER_PASSWORD
			}
		},
		from: env.EMAIL_FROM
	})
];

export const authProviderMap = providers.map((provider) => {
	if (typeof provider === 'function') {
		const providerData = provider();
		return { id: providerData.id, name: providerData.name };
	} else {
		return { id: provider.id, name: provider.name };
	}
});

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter: PrismaAdapter(prisma),
	providers
	//pages: {
	//	signIn: '/auth/login',
	//	signOut: '/auth/logout'
	//}
});
