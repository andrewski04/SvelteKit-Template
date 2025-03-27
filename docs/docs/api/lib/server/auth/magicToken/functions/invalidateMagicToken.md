# Function: invalidateMagicToken()

> **invalidateMagicToken**(`token`, `hashed`): `Promise`\<`void`\>

Defined in: [src/lib/server/auth/magicToken.ts:107](https://github.com/andrewski04/SvelteKit-Template/blob/9ffac812183d006906d6dfaaa45d8940033328db/src/lib/server/auth/magicToken.ts#L107)

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
