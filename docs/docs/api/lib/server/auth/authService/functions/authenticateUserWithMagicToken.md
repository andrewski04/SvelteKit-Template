# Function: authenticateUserWithMagicToken()

> **authenticateUserWithMagicToken**(`options`): `Promise`\<[`Result`](../../../../util/error/type-aliases/Result.md)\<`AuthenticateUserResult`\>\>

Defined in: [src/lib/server/auth/authService.ts:48](https://github.com/andrewski04/SvelteKit-Template/blob/9ffac812183d006906d6dfaaa45d8940033328db/src/lib/server/auth/authService.ts#L48)

Handles authentication flow on pages such as `/auth/check-email` and `/auth/otp`.

- Invalidates the magic token
- Creates or finds the user
- Creates a session
- Sets session cookies
- Handles redirect to user-setup if needed

## Parameters

### options

`AuthenticateUserOptions`

User's email, hashed magic token, cookies, and optional redirect URL.

## Returns

`Promise`\<[`Result`](../../../../util/error/type-aliases/Result.md)\<`AuthenticateUserResult`\>\>

Result with error or success and redirect URL.

## Example

```ts
const result = await authenticateUser({
  email: 'john@doe.com',
  hashedMagicToken: 'hashed-token',
  cookies: event.cookies,
  redirectTo: '/dashboard'
});
if (result.isErr()) {
  // handle error
}
const { success, redirectTo } = result.unwrap();
if (success) {
  // redirect to dashboard
} else {
  // handle failure
}
```
