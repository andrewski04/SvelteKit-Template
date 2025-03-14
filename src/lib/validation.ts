// functions used for input validation

/**
 * Validates an email address format
 *
 * @param email - The email address to validate
 * @returns An object with validation result and optional error message
 */
export function validateEmail(email: string): { valid: boolean; error?: string } {
	if (!email || email.trim() === '') {
		return { valid: false, error: 'Email is required' };
	}

	// RFC 5322 compliant regex for email validation
	const emailRegex =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

	if (!emailRegex.test(email)) {
		return { valid: false, error: 'Please enter a valid email address' };
	}

	return { valid: true };
}
