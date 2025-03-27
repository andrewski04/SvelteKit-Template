# Function: getSessionTokenCookie()

> **getSessionTokenCookie**(`event`): `undefined` \| `string`

Defined in: [src/lib/server/auth/session.ts:152](https://github.com/andrewski04/SvelteKit-Template/blob/9ffac812183d006906d6dfaaa45d8940033328db/src/lib/server/auth/session.ts#L152)

Gets the token from the session cookie.

## Parameters

### event

The request event partial (containing cookies).

#### cookies

`Cookies`

## Returns

`undefined` \| `string`

- The session token.
