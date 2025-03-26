# Function: requireAuth()

> **requireAuth**(`event`, `redirectTo`): `object`

Defined in: [src/lib/server/auth/guard.ts:24](https://github.com/andrewski04/SvelteKit-Template/blob/f0b9cd97c48d96681ee3ffe7effd53d4bdf784a1/src/lib/server/auth/guard.ts#L24)

Requires authentication to access the route, allowing ANY user to access the route.

AUTH CHECKING IS NOT SECURE WHEN USED IN LAYOUT, be sure to check on a page level instead!!

## Parameters

### event

`RequestEvent`

The request event object

### redirectTo

`string` = `'/auth/login'`

The URL to redirect to if not authenticated or authorized (default: '/auth/login')

## Returns

`object`

user and session if authenticated and authorized

### session

> **session**: `object`

#### session.createdAt

> **createdAt**: `Date`

#### session.expiresAt

> **expiresAt**: `Date`

#### session.hashedToken

> **hashedToken**: `string`

#### session.userId

> **userId**: `string`

### user

> **user**: `object`

#### user.createdAt

> **createdAt**: `Date`

#### user.email

> **email**: `string`

#### user.firstName

> **firstName**: `null` \| `string`

#### user.id

> **id**: `string`

#### user.lastName

> **lastName**: `null` \| `string`

#### user.role

> **role**: `string`

## Example

```ts
export const load: PageServerLoad = (event) => {
	const { user, session } = requireAuth(event); // will redirect to /auth/login if not authenticated
	// ...
 return { user }
}
```
