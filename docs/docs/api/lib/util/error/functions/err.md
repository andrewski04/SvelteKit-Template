# Function: err()

> **err**\<`E`\>(`error`): [`Err`](../classes/Err.md)\<`E`\>

Defined in: [src/lib/util/error.ts:121](https://github.com/andrewski04/SvelteKit-Template/blob/9ffac812183d006906d6dfaaa45d8940033328db/src/lib/util/error.ts#L121)

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
