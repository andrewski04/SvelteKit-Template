# Function: err()

> **err**\<`E`\>(`error`): [`Err`](../classes/Err.md)\<`E`\>

Defined in: [src/lib/util/error.ts:121](https://github.com/andrewski04/SvelteKit-Template/blob/f0b9cd97c48d96681ee3ffe7effd53d4bdf784a1/src/lib/util/error.ts#L121)

Used in functions returning Result<T> to return Err with error

## Type Parameters

### E

`E`

## Parameters

### error

`E`

The error to be wrapped in the Err result

## Returns

[`Err`](../classes/Err.md)\<`E`\>

An Err result with the given error

## Example

```ts
const function(): Result<string> {
  return err(new AppError('error', 'ERR_CODE'));
}
```
