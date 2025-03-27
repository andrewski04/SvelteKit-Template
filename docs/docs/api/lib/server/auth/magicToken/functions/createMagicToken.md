# Function: createMagicToken()

> **createMagicToken**(`email`, `deviceId`): `Promise`\<[`Result`](../../../../util/error/type-aliases/Result.md)\<\{ `token`: `string`; \}\>\>

Defined in: [src/lib/server/auth/magicToken.ts:15](https://github.com/andrewski04/SvelteKit-Template/blob/9ffac812183d006906d6dfaaa45d8940033328db/src/lib/server/auth/magicToken.ts#L15)

Creates a new magic token for the given email and device ID.

## Parameters

### email

`string`

The email associated with the token.

### deviceId

`string`

The ID of the device requesting the token.

## Returns

`Promise`\<[`Result`](../../../../util/error/type-aliases/Result.md)\<\{ `token`: `string`; \}\>\>

- An object containing the token and OTP.
