# Function: ok()

> **ok**\<`T`\>(`value`): [`Ok`](../classes/Ok.md)\<`T`\>

Defined in: [src/lib/util/error.ts:106](https://github.com/andrewski04/SvelteKit-Template/blob/9ffac812183d006906d6dfaaa45d8940033328db/src/lib/util/error.ts#L106)

Used in functions returning Result<T> to return Ok with value

## Type Parameters

### T

`T`

## Parameters

### value

`T`

The value to be wrapped in the Ok result

## Returns

[`Ok`](../classes/Ok.md)\<`T`\>

An Ok result with the given value

## Example

```ts
const function(): Result<> {
  return ok('success'); // ok.value == "success"
}
```
