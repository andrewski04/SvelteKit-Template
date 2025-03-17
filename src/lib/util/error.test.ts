import { describe, it, expect } from 'vitest';
import { ok, err, AppError } from '$lib/util/error';

describe('Error Utilities', () => {
	describe('ok Result type', () => {
		it('should create a successful Ok result', () => {
			const result = ok('test data');

			expect(result.isOk()).toBe(true);
			expect(result.isErr()).toBe(false);
			expect(result.value).toBe('test data');
			// @ts-expect-error 'Error' is not supposed to be on type 'Ok'
			expect(result.error).toBeUndefined();
		});
	});

	describe('err Result type', () => {
		it('should create an error Err result', () => {
			const error = new AppError('Test error', 'TEST_ERROR');
			const result = err(error);

			expect(result.isOk()).toBe(false);
			expect(result.isErr()).toBe(true);
			// @ts-expect-error 'Value' is not expected to be on type 'Err'
			expect(result.value).toBeUndefined();
			expect(result.error).toBe(error);
			expect(result.error?.message).toBe('Test error');
			expect(result.error?.code).toBe('TEST_ERROR');
		});
	});

	describe('AppError class', () => {
		it('should create an error with message and code', () => {
			const error = new AppError('Test error', 'TEST_ERROR', 500);

			expect(error).toBeInstanceOf(Error);
			expect(error.statusCode).toBe(500);
			expect(error.message).toBe('Test error');
			expect(error.code).toBe('TEST_ERROR');
		});
	});
});
