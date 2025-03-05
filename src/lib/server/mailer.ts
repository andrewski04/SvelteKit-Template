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

/**
 * Sends an email using the configured transporter.
 * @param to Recipient email address.
 * @param subject Email subject.
 * @param text Plain text content.
 * @param html HTML content (optional).
 */
export async function sendEmail({
	to,
	subject,
	text,
	html
}: {
	to: string;
	subject: string;
	text: string;
	html?: string;
}) {
	try {
		const info = await transporter.sendMail({
			from: process.env.EMAIL_FROM, // Default sender
			to,
			subject,
			text,
			html
		});

		console.log(`Email sent to ${to}: ${info.messageId}`);
		return info;
	} catch (error) {
		console.error('Error sending email:', error);
		throw new Error('Email could not be sent');
	}
}

export default transporter;
