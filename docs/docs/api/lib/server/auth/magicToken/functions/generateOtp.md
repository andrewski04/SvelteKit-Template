# Function: generateOtp()

> **generateOtp**(`rawToken`): `Promise`\<[`Result`](../../../../util/error/type-aliases/Result.md)\<`string`\>\>

Defined in: [src/lib/server/auth/magicToken.ts:122](https://github.com/andrewski04/SvelteKit-Template/blob/9ffac812183d006906d6dfaaa45d8940033328db/src/lib/server/auth/magicToken.ts#L122)

Generates a new OTP for a magic token.

## Parameters

### rawToken

`string`

The raw token to generate OTP for.

## Returns

`Promise`\<[`Result`](../../../../util/error/type-aliases/Result.md)\<`string`\>\>

The generated OTP.
