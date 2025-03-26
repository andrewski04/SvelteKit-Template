# Class: Ok\<T\>

Defined in: [src/lib/util/error.ts:38](https://github.com/andrewski04/SvelteKit-Template/blob/f0b9cd97c48d96681ee3ffe7effd53d4bdf784a1/src/lib/util/error.ts#L38)

Represents a successful operation with a value

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new Ok**\<`T`\>(`value`): `Ok`\<`T`\>

Defined in: [src/lib/util/error.ts:39](https://github.com/andrewski04/SvelteKit-Template/blob/f0b9cd97c48d96681ee3ffe7effd53d4bdf784a1/src/lib/util/error.ts#L39)

#### Parameters

##### value

`T`

#### Returns

`Ok`\<`T`\>

## Properties

### value

> `readonly` **value**: `T`

Defined in: [src/lib/util/error.ts:39](https://github.com/andrewski04/SvelteKit-Template/blob/f0b9cd97c48d96681ee3ffe7effd53d4bdf784a1/src/lib/util/error.ts#L39)

## Methods

### isErr()

> **isErr**(): `false`

Defined in: [src/lib/util/error.ts:51](https://github.com/andrewski04/SvelteKit-Template/blob/f0b9cd97c48d96681ee3ffe7effd53d4bdf784a1/src/lib/util/error.ts#L51)

#### Returns

`false`

true if the result is Err, false otherwise

***

### isOk()

> **isOk**(): `this is Ok<T>`

Defined in: [src/lib/util/error.ts:44](https://github.com/andrewski04/SvelteKit-Template/blob/f0b9cd97c48d96681ee3ffe7effd53d4bdf784a1/src/lib/util/error.ts#L44)

#### Returns

`this is Ok<T>`

true if the result is Ok, false otherwise

***

### unwrap()

> **unwrap**(): `T`

Defined in: [src/lib/util/error.ts:59](https://github.com/andrewski04/SvelteKit-Template/blob/f0b9cd97c48d96681ee3ffe7effd53d4bdf784a1/src/lib/util/error.ts#L59)

#### Returns

`T`

the value of the Ok result

#### Throws

Error if the result is Err
