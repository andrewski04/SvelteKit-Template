/**
 * Standard error message to be used throughout the app
 */
export class AppError {
	constructor(
		readonly message: string,
		readonly code: string,
		readonly statusCode: number = 500
	) {}

	toString(): string {
		return `${this.code} (${this.statusCode}): ${this.message}`;
	}
}

/**
 * Represents either success (Ok) or failure (Err)
 *
 *
 * @example
 * const result: Result<string, AppError> = ok('success');
 * if (result.isOk()) {
 *   console.log(result.unwrap()); // 'success' - result.value contains the same value
 * } else {
 *   console.error(result.unwrap()); // error typically shouldn't be unwrapped, handle it instead
 * }
 */
export type Result<T> = Ok<T> | Err<AppError>;

/**
 * Represents a successful operation with a value
 */
export class Ok<T> {
	constructor(readonly value: T) {}

	isOk(): this is Ok<T> {
		return true;
	}

	isErr(): false {
		return false;
	}

	unwrap(): T {
		return this.value;
	}
}

/**
 * Represents a failed operation with an error
 */
export class Err<E> {
	constructor(readonly error: E) {}

	isOk(): false {
		return false;
	}

	isErr(): this is Err<E> {
		return true;
	}

	unwrap(): never {
		throw new Error(`Tried to unwrap an Err value: ${this.error}`);
	}
}

/**
 * Used in functions returning Result<T> to return Ok with value
 *
 * @param value - The value to be wrapped in the Ok result
 * @returns An Ok result with the given value
 */
export function ok<T>(value: T): Ok<T> {
	return new Ok(value);
}

/**
 * Used in functions returning Result<T> to return Err with error
 *
 * @param error - The error to be wrapped in the Err result
 * @returns An Err result with the given error
 */
export function err<E>(error: E): Err<E> {
	return new Err(error);
}
