# Function: invalidateSession()

> **invalidateSession**(`sessionToken`, `hashed`): `Promise`\<`void`\>

Defined in: [src/lib/server/auth/session.ts:100](https://github.com/andrewski04/SvelteKit-Template/blob/9ffac812183d006906d6dfaaa45d8940033328db/src/lib/server/auth/session.ts#L100)

Invalidates a session by its token.

## Parameters

### sessionToken

`string`

The token of the session to invalidate.

### hashed

`boolean`

True if the token is already hashed, false if raw.

## Returns

`Promise`\<`void`\>
