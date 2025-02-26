import { SvelteKitAuth } from '@auth/sveltekit';
import Credentials from '@auth/sveltekit/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '$lib/server/prisma';
import bcrypt from 'bcryptjs';

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		Credentials({
			name: 'Email & Password',
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'you@example.com' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;

				// Find user in database
				const user = await prisma.user.findUnique({
					where: { email: credentials.email }
				});

				if (!user || !user.password) return null; // User doesn't exist or missing password

				// Check password validity
				const isValid = await bcrypt.compare(credentials.password, user.password);
				if (!isValid) return null; // Wrong password

				return { id: user.id, name: user.name, email: user.email };
			}
		})
	],
	callbacks: {
		async session({ session, user }) {
			session.user.id = user.id;
			return session;
		}
	}
});
