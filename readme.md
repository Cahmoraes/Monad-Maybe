# Motivation

This package creates Maybe Monad to work with values that may or may not exist.
Monad Maybe is a type safe to wrapping values and avoid the TypeError exceptions possibilities.

## Usage

to create monad Maybe, use:

```js
const maybe_1 = new Maybe(0)
// or
const maybe_2 = Maybe.of(0)
```

## to <strong>Map</strong> Monad value, use the map method:

this method should return a new value, else the next map chaining will receives a null value

```js
const result = Maybe.of(5).map((monadValue) => monadValue * 2)

console.log(result)
//=> { value: 10 }
```

## to <strong>Lift</strong> Monad value, use the chain method:

the chain method is used when the current chain return a new Monad.

```js
const result = Maybe.of(5)
  .map((monadValue) => monadValue * 2)
  .chain((monadValue) => Maybe.of(monadValue * 2))

console.log(result)
//=> { value: 20 }
```

## to <strong>Retrieve</strong> Monad value, use the getOrElse method:

the getOrElse method is receives a default value that is returned when the Monad value is null or undefined.

```js
const result_1 = Maybe.of(5)
  .map(() => null)
  .getOrElse(0)

console.log(result_1)
//=> 0

const result_2 = Maybe.of(5).getOrElse(0)

console.log(result_2)
//=> 5
```

## Example

```js
import { Maybe } from '@cahmoraes93/maybe'

const maybe_1 = new Maybe(5)
const result_1 = maybe_1
  .map((value) => value + 5)
  .map((value) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
  )
  .getOrElse('R$ 0,00')

console.log(result_1)
//=> R$ 5,00

const maybe_2 = Maybe.of(5)
const result_2 = maybe_2.map(() => null).getOrElse('R$ 0,00')

console.log(result_2)
//=> R$ 0,00
```
