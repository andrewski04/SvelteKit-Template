# Function: createUserIfNotExists()

> **createUserIfNotExists**(`email`): `Promise`\<[`Result`](../../../../util/error/type-aliases/Result.md)\<\{ `user`: \{ `createdAt`: `Date`; `email`: `string`; `firstName`: `null` \| `string`; `id`: `string`; `lastName`: `null` \| `string`; `role`: `string`; \}; \}\>\>

Defined in: [src/lib/server/auth/user.ts:24](https://github.com/andrewski04/SvelteKit-Template/blob/f0b9cd97c48d96681ee3ffe7effd53d4bdf784a1/src/lib/server/auth/user.ts#L24)

Creates a user if they don't already exist.

## Parameters

### email

`string`

The email address of the user.

## Returns

`Promise`\<[`Result`](../../../../util/error/type-aliases/Result.md)\<\{ `user`: \{ `createdAt`: `Date`; `email`: `string`; `firstName`: `null` \| `string`; `id`: `string`; `lastName`: `null` \| `string`; `role`: `string`; \}; \}\>\>

The existing or newly created user.
