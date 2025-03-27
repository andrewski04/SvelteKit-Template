# Class: AppError

Defined in: [src/lib/util/error.ts:4](https://github.com/andrewski04/SvelteKit-Template/blob/9ffac812183d006906d6dfaaa45d8940033328db/src/lib/util/error.ts#L4)

Standard error message to be used throughout the app

## Extends

- `Error`

## Constructors

### Constructor

> **new AppError**(`message`, `code`, `statusCode`): `AppError`

Defined in: [src/lib/util/error.ts:7](https://github.com/andrewski04/SvelteKit-Template/blob/9ffac812183d006906d6dfaaa45d8940033328db/src/lib/util/error.ts#L7)

#### Parameters

##### message

`string`

##### code

`string` = `'ERR_UNKNOWN'`

##### statusCode

`number` = `500`

#### Returns

`AppError`

#### Overrides

`Error.constructor`

## Properties

### cause?

> `optional` **cause**: `unknown`

Defined in: docs/node\_modules/typescript/lib/lib.es2022.error.d.ts:24

#### Inherited from

`Error.cause`

***

### code

> `readonly` **code**: `string`

Defined in: [src/lib/util/error.ts:5](https://github.com/andrewski04/SvelteKit-Template/blob/9ffac812183d006906d6dfaaa45d8940033328db/src/lib/util/error.ts#L5)

***

### message

> `readonly` **message**: `string`

Defined in: [src/lib/util/error.ts:8](https://github.com/andrewski04/SvelteKit-Template/blob/9ffac812183d006906d6dfaaa45d8940033328db/src/lib/util/error.ts#L8)

#### Inherited from

`Error.message`

***

### name

> **name**: `string`

Defined in: docs/node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Inherited from

`Error.name`

***

### stack?

> `optional` **stack**: `string`

Defined in: docs/node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

`Error.stack`

***

### statusCode

> `readonly` **statusCode**: `number` = `500`

Defined in: [src/lib/util/error.ts:10](https://github.com/andrewski04/SvelteKit-Template/blob/9ffac812183d006906d6dfaaa45d8940033328db/src/lib/util/error.ts#L10)

***

### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Defined in: node\_modules/@types/node/globals.d.ts:143

Optional override for formatting stack traces

#### Parameters

##### err

`Error`

##### stackTraces

`CallSite`[]

#### Returns

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

`Error.prepareStackTrace`

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

Defined in: node\_modules/@types/node/globals.d.ts:145

#### Inherited from

`Error.stackTraceLimit`

## Methods

### toString()

> **toString**(): `string`

Defined in: [src/lib/util/error.ts:16](https://github.com/andrewski04/SvelteKit-Template/blob/9ffac812183d006906d6dfaaa45d8940033328db/src/lib/util/error.ts#L16)

Returns a string representation of an object.

#### Returns

`string`

***

### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Defined in: node\_modules/@types/node/globals.d.ts:136

Create .stack property on a target object

#### Parameters

##### targetObject

`object`

##### constructorOpt?

`Function`

#### Returns

`void`

#### Inherited from

`Error.captureStackTrace`
