import { describe, it, expect, vi } from 'vitest'
import { MaybeType, Maybe } from '../src'
import { Just } from '../src/maybe/just'
import { Nothing } from '../src/maybe/nothing'

describe('Monad Maybe Test Suite', () => {
  it('should return an Maybe instance when use new operator', () => {
    const maybe = Maybe.of(0)
    expect(maybe).toBeInstanceOf(Just)
  })

  describe('Maybe.of', () => {
    it('should return a Maybe instance when of static method', () => {
      const maybe = Maybe.of(0)
      expect(maybe).toBeInstanceOf(Just)
    })
  })

  describe('Maybe.empty', () => {
    it('should return a Maybe instance null', () => {
      const maybe = Maybe.empty()

      expect(maybe).toBeInstanceOf(Nothing)
      expect(maybe.isNothing()).toBe(true)
    })
  })

  describe('map', () => {
    it('should map a Monad value with callback', () => {
      const maybe = Maybe.of(0)
      const fn = (value: number) => value + 2

      const callback = vi.fn().mockImplementation(fn as any)

      const result = maybe.map(callback)
      const expected = { value: 2 }
      expect(result).toMatchObject(expected)
      expect(callback).toHaveBeenCalledTimes(1)
      expect(callback).toHaveBeenCalledWith(0)
    })

    it('should map an object and navigate from your properties', () => {
      const user = {
        name: 'John',
        address: {
          street: 'Baker street',
          number: '221B',
          city: 'London',
        },
      }

      const monad = Maybe.of(user)
      const result = monad
        .map((user) => user.address)
        .map((address) => address.city)
        .map((city) => city)
        .orDefault('no-city')

      expect(result).toBe(user.address.city)
    })
  })

  describe('orDefault', () => {
    it('should return Monad value when result is not null', () => {
      const maybe = Maybe.of(0)
      const fn = (value: number) => value + 2

      const result = maybe.map(fn).orDefault(0)
      const expected = 2

      expect(result).toBe(expected)
    })

    it('should return default value when result null or undefined', () => {
      const maybe = Maybe.of(0)
      const fn: any = () => null

      const result = maybe.map(fn).map(fn).orDefault(0)
      const expected = 0

      expect(result).toBe(expected)
    })

    it('should return default value when trying map a null value', () => {
      const maybe = Maybe.of(5)
      const expected = 'R$ 0,00'

      const result = maybe
        .map(() => null)
        .map((value) =>
          (value as any).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
        )
        .orDefault('R$ 0,00')

      expect(result).toEqual(expected)
    })
  })

  describe('chain', () => {
    it('should lift Monad value when exists Monad nested', () => {
      const maybe = Maybe.of(0)
      const fn = (value: number) => Maybe.of(value + 2)

      const result = maybe.chain(fn).orDefault(0)
      const expected = 2

      expect(result).toBe(expected)
    })

    it('should return default value, when lift Monad value if null', () => {
      const maybe = Maybe.of(0)
      const fn: any = () => Maybe.of(null)

      const result = maybe
        .map(() => null)
        .chain(fn)
        .orDefault(0)

      const expected = 0

      expect(result).toBe(expected)

      const maybe_2 = Maybe.of(5)
      const fnNull: any = () => null
      const result_2 = maybe_2.map(fnNull).orDefault('R$ 0,00')
      expect(result_2).toBe('R$ 0,00')
    })

    it('should lift a Maybe when chain return a nested Maybe', () => {
      const user = {
        name: 'John',
        address: {
          street: 'Baker street',
          number: '221B',
          locale: {
            city: 'london',
          },
        },
      }

      const monad = Maybe.of(user)
      const result = monad
        .map((user) => user.address)
        .chain((address) => Maybe.of(address.locale))
        .map((locale) => locale.city)
        .orDefault('no-city')

      expect(result).toBe(user.address.locale.city)
    })
  })

  describe('isNothing', () => {
    it('should return true when Monad value is false', () => {
      const data = { username: 'John' }
      const monad = Maybe.of(data)

      expect(monad.isNothing()).toBe(false)

      const nothingMonad = monad.map(() => null)

      expect(monad.isNothing()).toBe(false)
      expect(nothingMonad.isNothing()).toBe(true)

      const chained = Maybe.of(data)
        .chain((data) => Maybe.of(data))
        .orDefault({
          username: 'John',
        })

      expect(chained).toEqual(data)

      const isNothing = Maybe.of(5).map(() => null)
      expect(isNothing.isNothing()).toBe(true)
    })

    it('should return Just when Monad value is empty', () => {
      const data = { username: 'John' }
      const chainNull: any = () => Maybe.of(null)
      const monad = Maybe.of(data).chain(chainNull)
      expect(monad.orDefault(10)).toBe(10)
    })

    it('should return Just when Monad is Nothing', () => {
      const data = { username: 'John' }
      const monad = Maybe.of(data).chain(() => Maybe.empty())
      expect(monad.orDefault(10)).toBe(10)
    })
  })

  describe('getSafe', () => {
    it('should return an object containing property success with type of boolean', () => {
      const data = { username: 'John' }
      const monad = Maybe.of(data)

      const userSafe = monad.getSafe()

      expect(userSafe).toMatchObject({
        success: expect.any(Boolean),
      })
    })

    it('should return an object containing property success and its value to be true', () => {
      const data = { username: 'John' }
      const monad = Maybe.of(data)

      const userSafe = monad.getSafe()

      expect(userSafe).toMatchObject({
        success: true,
        data: expect.any(Object),
      })
    })

    it('should return an object containing property data and its value to be Monad Value', () => {
      const user = { username: 'John' }
      const monad = Maybe.of(user).map((user) => ({
        ...user,
        username: 'George',
      }))

      const userSafe = monad.getSafe()

      expect(userSafe).toMatchObject({
        success: true,
        data: {
          username: 'George',
        },
      })

      if (userSafe.success) {
        expect(userSafe.data.username).toBe('George')
      }
    })

    it('should return an object containing property success and its value to false', () => {
      const monad = Maybe.empty()
      const monadSafe = monad.getSafe()
      expect(monadSafe.success).toBe(false)
    })
  })

  describe('orDefaultLazy', () => {
    it('should return the result of the function passed by parameter when Monad is Nothing', () => {
      const maybe_1 = Maybe.empty()
      const result = maybe_1.orDefaultLazy(() => 1)

      expect(result).toBe(1)
    })

    it('should return the result of the Monad, ignoring the function passed by parameter, when Monad is Just', () => {
      const maybe_1 = Maybe.of(3)
      const result = maybe_1.orDefaultLazy(() => 1)

      expect(result).toBe(3)
    })
  })

  describe('filter', () => {
    it('should return Just predicate returns true', () => {
      const maybe = Maybe.of(5)
      const result = maybe.filter((value) => value > 3)

      expect(result).toBeInstanceOf(Just)
    })

    it('should return Nothing when predicate returns false', () => {
      const maybe = Maybe.of(5)
      const result = maybe.filter((value) => value > 10)

      expect(result).toBeInstanceOf(Nothing)
      expect(result.isNothing()).toBe(true)
    })

    it('should return Nothing when Monad is Nothing', () => {
      const maybe = Maybe.empty()
      const result = maybe.filter(() => true)
      expect(result).toBeInstanceOf(Nothing)
    })
  })

  describe('reduce', () => {
    it('should reduce Monad value', () => {
      const monad: MaybeType<number> = Maybe.of(5)
      const reduced = monad.reduce((acc, value) => acc + value, 2)
      expect(reduced).toBe(7)
    })

    it('should return initial value when Monad is Nothing', () => {
      const monad = Maybe.empty()
      const reduced = monad.reduce((_, __) => 1 + 5, 2)
      expect(reduced).toBe(2)
    })
  })

  describe('ifJust', () => {
    it('should run an effect if Monad is Just', () => {
      const maybe = Maybe.of(5)
      const effect = vi.fn((value) => console.log(`effect: ${value}`))
      maybe.ifJust(effect)

      expect(effect).toHaveBeenCalled()
      expect(effect).toHaveBeenCalledWith(5)
    })

    it('should not run an effect if Monad is Nothing', () => {
      const maybe = Maybe.empty()
      const effect = vi.fn((value) => console.log(`effect: ${value}`))
      maybe.ifJust(effect)

      expect(effect).not.toHaveBeenCalled()
    })
  })

  describe('ifNothing', () => {
    it('should run an effect if Monad is Nothing', () => {
      const maybe = Maybe.empty()
      const effect = vi.fn(() => console.log('effect'))
      maybe.ifNothing(effect)

      expect(effect).toHaveBeenCalled()
      expect(effect).toHaveBeenCalledWith()
    })

    it('should not run an effect if Monad is Just', () => {
      const maybe = Maybe.of(5)
      const effect = vi.fn(() => console.log(`effect`))
      maybe.ifNothing(effect)

      expect(effect).not.toHaveBeenCalled()
    })
  })

  describe('isJust', () => {
    it('should return true when Monad is a Just', () => {
      const maybe = Maybe.of(5)
      const result = maybe.isJust()

      expect(result).toBe(true)
    })

    it('should return false when Monad is a Nothing', () => {
      const maybe = Maybe.empty()
      const result = maybe.isJust()

      expect(result).toBe(false)
    })
  })
})
