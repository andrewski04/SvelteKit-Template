# Function: requireRole()

> **requireRole**(`event`, `role`, `redirectTo`): `object`

Defined in: [src/lib/server/auth/guard.ts:53](https://github.com/andrewski04/SvelteKit-Template/blob/9ffac812183d006906d6dfaaa45d8940033328db/src/lib/server/auth/guard.ts#L53)

Requires authentication and authorization to access the route, allowing only users with the specified role to access the route.

AUTH CHECKING IS NOT SECURE WHEN USED IN LAYOUT, be sure to check on a page level instead!!

## Parameters

### event

`RequestEvent`

The request event object

### role

`string`

The role to check for (`admin` or `user`)

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
	const { user, session } = requireRole(event, 'admin'); // will redirect to /auth/login if not authenticated or not an admin
	// ...
 return { user }
}
```
