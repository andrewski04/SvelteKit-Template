# Function: findActiveMagicTokenByEmail()

> **findActiveMagicTokenByEmail**(`email`): `Promise`\<`null` \| \{ `createdAt`: `Date`; `deviceId`: `string`; `email`: `string`; `expiresAt`: `Date`; `hashedOtp`: `null` \| `string`; `hashedToken`: `string`; \}\>

Defined in: [src/lib/server/auth/magicToken.ts:74](https://github.com/andrewski04/SvelteKit-Template/blob/f0b9cd97c48d96681ee3ffe7effd53d4bdf784a1/src/lib/server/auth/magicToken.ts#L74)

Finds an active magic token for a specific email.

## Parameters

### email

`string`

The email to search for.

## Returns

`Promise`\<`null` \| \{ `createdAt`: `Date`; `deviceId`: `string`; `email`: `string`; `expiresAt`: `Date`; `hashedOtp`: `null` \| `string`; `hashedToken`: `string`; \}\>

The active magic token or null if none found.
