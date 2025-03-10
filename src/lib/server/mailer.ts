import nodemailer from 'nodemailer';

/**
 * Nodemailer transporter configured using environment variables.
 */
const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_SERVER_HOST,
	port: Number(process.env.EMAIL_SERVER_PORT), // Convert string to number
	secure: false, // Set to `true` for TLS, `false` for local/dev
	auth: {
		user: process.env.EMAIL_SERVER_USER,
		pass: process.env.EMAIL_SERVER_PASSWORD
	},
	tls: {
		rejectUnauthorized: false // Allow self-signed certificates (useful for local testing)
	}
});

export async function sendMagicLink(email: string, token: string): Promise<void> {
	const magicLink = `${process.env.DOMAIN}api/auth/magic?token=${token}`;

	await transporter.sendMail({
		from: process.env.EMAIL_USER,
		to: email,
		subject: 'Your Login Link',
		html: `<p>Click the link below to log in, this will expire in 10 minutes:</p>
		       <a href="${magicLink}">Login</a>`
	});
}

export default transporter;
