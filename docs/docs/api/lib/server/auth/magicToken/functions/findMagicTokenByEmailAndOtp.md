# Function: findMagicTokenByEmailAndOtp()

> **findMagicTokenByEmailAndOtp**(`email`, `otp`): `Promise`\<`null` \| \{ `createdAt`: `Date`; `deviceId`: `string`; `email`: `string`; `expiresAt`: `Date`; `hashedOtp`: `null` \| `string`; `hashedToken`: `string`; \}\>

Defined in: [src/lib/server/auth/magicToken.ts:90](https://github.com/andrewski04/SvelteKit-Template/blob/9ffac812183d006906d6dfaaa45d8940033328db/src/lib/server/auth/magicToken.ts#L90)

Finds a magic token by email and OTP code.

## Parameters

### email

`string`

The email associated with the token.

### otp

`string`

The raw OTP code to verify.

## Returns

`Promise`\<`null` \| \{ `createdAt`: `Date`; `deviceId`: `string`; `email`: `string`; `expiresAt`: `Date`; `hashedOtp`: `null` \| `string`; `hashedToken`: `string`; \}\>

The magic token or null if not found or invalid.
