# Class: Err\<E\>

Defined in: [src/lib/util/error.ts:67](https://github.com/andrewski04/SvelteKit-Template/blob/f0b9cd97c48d96681ee3ffe7effd53d4bdf784a1/src/lib/util/error.ts#L67)

Represents a failed operation with an error

## Type Parameters

### E

`E`

## Constructors

### Constructor

> **new Err**\<`E`\>(`error`): `Err`\<`E`\>

Defined in: [src/lib/util/error.ts:68](https://github.com/andrewski04/SvelteKit-Template/blob/f0b9cd97c48d96681ee3ffe7effd53d4bdf784a1/src/lib/util/error.ts#L68)

#### Parameters

##### error

`E`

#### Returns

`Err`\<`E`\>

## Properties

### error

> `readonly` **error**: `E`

Defined in: [src/lib/util/error.ts:68](https://github.com/andrewski04/SvelteKit-Template/blob/f0b9cd97c48d96681ee3ffe7effd53d4bdf784a1/src/lib/util/error.ts#L68)

## Methods

### isErr()

> **isErr**(): `this is Err<E>`

Defined in: [src/lib/util/error.ts:80](https://github.com/andrewski04/SvelteKit-Template/blob/f0b9cd97c48d96681ee3ffe7effd53d4bdf784a1/src/lib/util/error.ts#L80)

#### Returns

`this is Err<E>`

true if the result is Err, false otherwise

***

### isOk()

> **isOk**(): `false`

Defined in: [src/lib/util/error.ts:73](https://github.com/andrewski04/SvelteKit-Template/blob/f0b9cd97c48d96681ee3ffe7effd53d4bdf784a1/src/lib/util/error.ts#L73)

#### Returns

`false`

true if the result is Ok, false otherwise

***

### unwrapErr()

> **unwrapErr**(): `never`

Defined in: [src/lib/util/error.ts:90](https://github.com/andrewski04/SvelteKit-Template/blob/f0b9cd97c48d96681ee3ffe7effd53d4bdf784a1/src/lib/util/error.ts#L90)

#### Returns

`never`

the error of the Err result

#### Throws

Error if the result is Ok

Err typically shouldn't be unwrapped, unless the error is fatal
