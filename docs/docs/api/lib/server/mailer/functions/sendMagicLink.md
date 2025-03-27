# Function: sendMagicLink()

> **sendMagicLink**(`email`, `token`, `baseUrl`): `Promise`\<[`Result`](../../../util/error/type-aliases/Result.md)\<`void`\>\>

Defined in: [src/lib/server/mailer.ts:28](https://github.com/andrewski04/SvelteKit-Template/blob/9ffac812183d006906d6dfaaa45d8940033328db/src/lib/server/mailer.ts#L28)

Sends a magic link to the user's email.

## Parameters

### email

`string`

The email address to send the link to.

### token

`string`

The magic token.

### baseUrl

`string`

The base URL for the magic link. (e.g. http://localhost:5173)

## Returns

`Promise`\<[`Result`](../../../util/error/type-aliases/Result.md)\<`void`\>\>
