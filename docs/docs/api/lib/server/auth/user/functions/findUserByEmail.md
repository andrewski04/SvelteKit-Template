# Function: findUserByEmail()

> **findUserByEmail**(`email`): `Promise`\<`null` \| \{ `createdAt`: `Date`; `email`: `string`; `firstName`: `null` \| `string`; `id`: `string`; `lastName`: `null` \| `string`; `role`: `string`; \}\>

Defined in: [src/lib/server/auth/user.ts:12](https://github.com/andrewski04/SvelteKit-Template/blob/9ffac812183d006906d6dfaaa45d8940033328db/src/lib/server/auth/user.ts#L12)

Finds a user by their email address.

## Parameters

### email

`string`

The email address to search for.

## Returns

`Promise`\<`null` \| \{ `createdAt`: `Date`; `email`: `string`; `firstName`: `null` \| `string`; `id`: `string`; `lastName`: `null` \| `string`; `role`: `string`; \}\>

The user or null if not found.
