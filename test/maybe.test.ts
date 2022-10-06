import { describe, it, expect, jest } from '@jest/globals'
import { Maybe } from '../src'

describe('Monad Maybe Test Suite', () => {
  it('should return an Maybe instance when use new operator', () => {
    const maybe = new Maybe(0)
    expect(maybe).toBeInstanceOf(Maybe)
  })

  it('#of should return an Maybe instance when of static method', () => {
    const maybe = Maybe.of(0)
    expect(maybe).toBeInstanceOf(Maybe)
  })

  it('#map should map a Monad value with callback', () => {
    const maybe = Maybe.of(0)
    const fn = (value: number) => value + 2

    const callback = jest.fn().mockImplementation(fn as any)

    const result = maybe.map(callback)
    const expected = { value: 2 }
    expect(result).toMatchObject(expected)
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(0)
  })

  it('#getOrElse should return Monad value when result is not null', () => {
    const maybe = Maybe.of(0)
    const fn = (value: number) => value + 2

    const result = maybe.map(fn).getOrElse(0)
    const expected = 2

    expect(result).toBe(expected)
  })

  it('#getOrElse should return default value when result null or undefined', () => {
    const maybe = Maybe.of(0)
    const fn = () => null

    const result = maybe.map(fn).map(fn).getOrElse(0)
    const expected = 0

    expect(result).toBe(expected)
  })

  it('#getOrElse should return default value when trying map a null value', () => {
    const maybe = new Maybe(5)
    const expected = 'R$ 0,00'

    const result = maybe
      .map(() => null)
      .map((value) =>
        value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      )
      .getOrElse('R$ 0,00')

    expect(result).toEqual(expected)
  })

  it('#chain should lift Monad value when exists Monad nested', () => {
    const maybe = Maybe.of(0)
    const fn = (value: number) => Maybe.of(value + 2)

    const result = maybe.chain(fn).getOrElse(0)
    const expected = 2

    expect(result).toBe(expected)
  })

  it('#chain should return default value, when lift Monad value if null', () => {
    const maybe = Maybe.of(0)
    const fn = () => Maybe.of(null)

    const result = maybe
      .map(() => null)
      .chain(fn)
      .getOrElse(0)

    const expected = 0

    expect(result).toBe(expected)
  })
})
