# Motivation

This package creates Maybe Monad to work with values that may or may not exist.
Monad Maybe is a type safe to wrapping values and avoid the TypeError exceptions possibilities.

## Usage

to create monad Maybe, use:

```js
const maybe_1 = Maybe.of(0)
// or
const maybe_2 = Maybe.empty()
```

## to create an empty Maybe, use static method Maybe.empty()

In React, we need to work with immutable data when we're using states. May Be.empty() is useful when we need define an initial statue to our data. Mainly when that data are loaded by asynchronous.
Maybe.empty() return a Maybe with null wrapped. But its inference is "any" just for TypeScript to ignore the generic type parameter.

```js
const maybe = Maybe.empty()

console.log(maybe.isNothing()) // true
```

Maybe.empty() causes TypeScript's type checking to ignore the initial state type:

```ts
const [user, setUser] = useState<Maybe<User>>(MaybeEmpty.empty())
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

## to <strong>get</strong> Monad value, use the orDefault method:

the orDefault method is receives a default value that is returned when the Monad value is null or undefined.

```js
const result_1 = Maybe.of(5)
  .map(() => null)
  .orDefault(0)

console.log(result_1)
//=> 0

const result_2 = Maybe.of(5).orDefault(0)

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
  .orDefault('R$ 0,00')

console.log(result_1)
//=> R$ 5,00

const maybe_2 = Maybe.of(5)
const result_2 = maybe_2.map(() => null).orDefault('R$ 0,00')

console.log(result_2)
//=> R$ 0,00
```

## to check if the Monad is Null or Undefined, use <strong>isNothing</strong>:

this method return a boolean. True if the Monad is Null or Undefined, else false.

```js
const monad = Maybe.of(5).map(() => null)

console.log(monad.isNothing())
//=> true
```

## to check if the Monad is a Just use <strong>isJust</strong>:

this method return a boolean. True if the Monad is a Just, else returns false.

```js
const monad = Maybe.of(5)

console.log(monad.isJust())
//=> true
```

## to get Monad's value without define default value "orDefault", use <strong>getSafe</strong>:

this method return a new Object containing a property called success of type of boolean.
This object is a Discriminated Union. That's, if the success property was true, will there is a property data containing the Monad's value. Else, will there is no have the data property.

In this case, the client should handle the case when don't have a valid value in the monad.

```js
const user = { username: 'John' }
const monad = Maybe.of(user).map((user) => ({
  ...user,
  username: 'George',
}))

const userSafe = monad.getSafe()
if (!userSafe.success) {
  // handle when Monad's value is null.
} else {
  // handle when Monad's value is valid.
}
```

## to get Monad's value using lazy default evaluation, use <strong>orDefaultLazy</strong>:

this method returns Monad's value if it was Nothing.

```js
const result = Maybe.empty().orDefaultLazy(() => ({
  username: 'George',
}))

console.log(result)
// => { username: 'George' }
```

## to filter Monad's value using a predicate, use <strong>filter</strong>:

this method returns new Monad valid with your value if predicate is true, or empty Monad if predicate is false.

```js
const maybe = Maybe.of(5)
const result = maybe.filter((value) => value > 10)

console.(result.isNothing())
// => true
```

## to reducer Monad's value, use <strong>reduce</strong>:

this method apply a reducer function to Monad's value, if it was Nothing, returns initial value, else returns value transformed.

```js
const monad = Maybe.of(5)
const reduced = monad.reduce((acc, value) => acc + value, 2)
console.log(reduced)
// => 7

const empty = Maybe.empty(5)
const reduced_empty = empty.reduce((_, __) => 10 + 10, 2)
console.log(reduced_empty)
```

## to runs an effect if Monad is Just, use <strong>ifJust</strong>:

this method runs an effect if monad is a Just, it receives monad's value in argument and returns the "this".

```js
const just = Maybe.of(5)
maybe.ifJust((value) => console.log(`success: ${value}`))
// => success 5

const nothing = Maybe.empty()
nothing.ifJust((value) => console.log(`success: ${value}`))
// =>
```

## to runs an effect if Monad is Nothing, use <strong>ifNothing</strong>:

this method runs an effect if monad is a Nothing, and returns the "this".

```js
const just = Maybe.of(5)
maybe.ifNothing(() => console.log('error'))
// =>

const nothing = Maybe.empty()
nothing.ifNothing(() => console.log('error'))
// => error
```
