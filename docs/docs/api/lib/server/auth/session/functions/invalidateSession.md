# Function: invalidateSession()

> **invalidateSession**(`sessionToken`, `hashed`): `Promise`\<`void`\>

Defined in: [src/lib/server/auth/session.ts:100](https://github.com/andrewski04/SvelteKit-Template/blob/f0b9cd97c48d96681ee3ffe7effd53d4bdf784a1/src/lib/server/auth/session.ts#L100)

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
