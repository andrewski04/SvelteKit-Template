# Function: findActiveMagicTokenByEmail()

> **findActiveMagicTokenByEmail**(`email`): `Promise`\<`null` \| \{ `createdAt`: `Date`; `deviceId`: `string`; `email`: `string`; `expiresAt`: `Date`; `hashedOtp`: `null` \| `string`; `hashedToken`: `string`; \}\>

Defined in: [src/lib/server/auth/magicToken.ts:74](https://github.com/andrewski04/SvelteKit-Template/blob/9ffac812183d006906d6dfaaa45d8940033328db/src/lib/server/auth/magicToken.ts#L74)

Finds an active magic token for a specific email.

## Parameters

### email

`string`

The email to search for.

## Returns

`Promise`\<`null` \| \{ `createdAt`: `Date`; `deviceId`: `string`; `email`: `string`; `expiresAt`: `Date`; `hashedOtp`: `null` \| `string`; `hashedToken`: `string`; \}\>

The active magic token or null if none found.
