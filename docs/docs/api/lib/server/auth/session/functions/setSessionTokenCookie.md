# Function: setSessionTokenCookie()

> **setSessionTokenCookie**(`event`, `token`, `expiresAt`): `void`

Defined in: [src/lib/server/auth/session.ts:123](https://github.com/andrewski04/SvelteKit-Template/blob/f0b9cd97c48d96681ee3ffe7effd53d4bdf784a1/src/lib/server/auth/session.ts#L123)

Sets the session token cookie.

## Parameters

### event

The request event partial (containing cookies).

#### cookies

`Cookies`

### token

`string`

The session token.

### expiresAt

`Date`

The expiration date of the session.

## Returns

`void`
