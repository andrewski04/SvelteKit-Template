# Function: findMagicTokenByToken()

> **findMagicTokenByToken**(`token`): `Promise`\<`null` \| \{ `createdAt`: `Date`; `deviceId`: `string`; `email`: `string`; `expiresAt`: `Date`; `hashedOtp`: `null` \| `string`; `hashedToken`: `string`; \}\>

Defined in: [src/lib/server/auth/magicToken.ts:55](https://github.com/andrewski04/SvelteKit-Template/blob/9ffac812183d006906d6dfaaa45d8940033328db/src/lib/server/auth/magicToken.ts#L55)

Finds a magic token by its token ID.

## Parameters

### token

`string`

The raw token to find.

## Returns

`Promise`\<`null` \| \{ `createdAt`: `Date`; `deviceId`: `string`; `email`: `string`; `expiresAt`: `Date`; `hashedOtp`: `null` \| `string`; `hashedToken`: `string`; \}\>

The magic token or null if not found or invalid.
