# Function: invalidateMagicToken()

> **invalidateMagicToken**(`token`, `hashed`): `Promise`\<`void`\>

Defined in: [src/lib/server/auth/magicToken.ts:107](https://github.com/andrewski04/SvelteKit-Template/blob/f0b9cd97c48d96681ee3ffe7effd53d4bdf784a1/src/lib/server/auth/magicToken.ts#L107)

Marks a magic token as used.

## Parameters

### token

`string`

The token to mark as used.

### hashed

`boolean`

True if the token is already hashed, false if raw.

## Returns

`Promise`\<`void`\>
