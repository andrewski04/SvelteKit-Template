# Function: setSessionTokenCookie()

> **setSessionTokenCookie**(`event`, `token`, `expiresAt`): `void`

Defined in: [src/lib/server/auth/session.ts:123](https://github.com/andrewski04/SvelteKit-Template/blob/9ffac812183d006906d6dfaaa45d8940033328db/src/lib/server/auth/session.ts#L123)

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
