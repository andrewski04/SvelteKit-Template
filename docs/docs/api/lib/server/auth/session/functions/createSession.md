# Function: createSession()

> **createSession**(`userId`): `Promise`\<[`Result`](../../../../util/error/type-aliases/Result.md)\<\{ `session`: \{ `createdAt`: `Date`; `expiresAt`: `Date`; `hashedToken`: `string`; `userId`: `string`; \}; `token`: `string`; \}\>\>

Defined in: [src/lib/server/auth/session.ts:32](https://github.com/andrewski04/SvelteKit-Template/blob/9ffac812183d006906d6dfaaa45d8940033328db/src/lib/server/auth/session.ts#L32)

Creates a new session for the user, returning the session object and the token.

Note that session ID is the hashed token, the returned token
should be used to set cookies as this will be forgotten by the server!

## Parameters

### userId

`string`

User ID to create session for.

## Returns

`Promise`\<[`Result`](../../../../util/error/type-aliases/Result.md)\<\{ `session`: \{ `createdAt`: `Date`; `expiresAt`: `Date`; `hashedToken`: `string`; `userId`: `string`; \}; `token`: `string`; \}\>\>

- An object containing the session object and the token.
