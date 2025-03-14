import { type Result, AppError, ok, err } from './error';

// functions used for input validation

/**
 * Validates an email address format
 *
 * @param email - The email address to validate
 * @returns Ok if valid, Err if invalid
 */
export function validateEmail(email: string): Result<boolean> {
	if (!email || email.trim() === '') {
		return err(new AppError('Email is required', 'ERR_EMAIL_REQUIRED'));
	}

	// RFC 5322 compliant regex for email validation
	const emailRegex =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

	if (!emailRegex.test(email)) {
		return err(new AppError('Invalid email', 'ERR_INVALID_EMAIL'));
	}

	return ok(true);
}
