# Type Alias: Result\<T\>

> **Result**\<`T`\> = [`Ok`](../classes/Ok.md)\<`T`\> \| [`Err`](../classes/Err.md)\<[`AppError`](../classes/AppError.md)\>

Defined in: [src/lib/util/error.ts:33](https://github.com/andrewski04/SvelteKit-Template/blob/9ffac812183d006906d6dfaaa45d8940033328db/src/lib/util/error.ts#L33)

Represents either success (Ok) or failure (Err)

## Type Parameters

### T

`T`

## Example

```ts
const result: Result<string> = ok('success');
if (result.isOk()) {
  console.log(result.unwrap()); // 'success' - result.value contains the same value
} else {
  console.error(result.unwrap()); // error typically shouldn't be unwrapped, handle it instead
}
```
