# Function: validateSessionToken()

> **validateSessionToken**(`token`): `Promise`\<\{ `session`: `null` \| \{ `createdAt`: `Date`; `expiresAt`: `Date`; `hashedToken`: `string`; `userId`: `string`; \}; `user`: `null` \| \{ `createdAt`: `Date`; `email`: `string`; `firstName`: `null` \| `string`; `id`: `string`; `lastName`: `null` \| `string`; `role`: `string`; \}; \}\>

Defined in: [src/lib/server/auth/session.ts:58](https://github.com/andrewski04/SvelteKit-Template/blob/f0b9cd97c48d96681ee3ffe7effd53d4bdf784a1/src/lib/server/auth/session.ts#L58)

Validates a session token, returning the session object and the user object.

## Parameters

### token

`string`

The session token to validate.

## Returns

`Promise`\<\{ `session`: `null` \| \{ `createdAt`: `Date`; `expiresAt`: `Date`; `hashedToken`: `string`; `userId`: `string`; \}; `user`: `null` \| \{ `createdAt`: `Date`; `email`: `string`; `firstName`: `null` \| `string`; `id`: `string`; `lastName`: `null` \| `string`; `role`: `string`; \}; \}\>

- An object containing the session object and the user object.
