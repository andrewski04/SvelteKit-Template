# Function: getSessionTokenCookie()

> **getSessionTokenCookie**(`event`): `undefined` \| `string`

Defined in: [src/lib/server/auth/session.ts:152](https://github.com/andrewski04/SvelteKit-Template/blob/f0b9cd97c48d96681ee3ffe7effd53d4bdf784a1/src/lib/server/auth/session.ts#L152)

Gets the token from the session cookie.

## Parameters

### event

The request event partial (containing cookies).

#### cookies

`Cookies`

## Returns

`undefined` \| `string`

- The session token.
