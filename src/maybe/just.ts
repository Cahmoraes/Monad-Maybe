import type {
  Callback,
  CallbackChain,
  CallbackEffect,
  CallbackPredicate,
  GetSafeReturn,
  Maybe,
} from './maybe'
import { nothing } from './nothing'

export class Just<Type> implements Maybe<Type> {
  constructor(private _value: Type) {}

  public isJust(): this is Just<Type> {
    return true
  }

  private get value() {
    return this._value
  }

  public isNothing(): boolean {
    return false
  }

  public map<TransformedType>(
    callbackMap: Callback<Type, TransformedType>,
  ): Maybe<TransformedType> {
    const result = callbackMap(this._value)
    return this.isEmpty(result) ? nothing() : just(result)
  }

  private isEmpty(aValue: unknown): aValue is null | undefined {
    return aValue === undefined || aValue === null
  }

  public filter<NextType extends Type>(
    predicate: CallbackPredicate<Type, NextType>,
  ): Maybe<NextType> {
    return predicate(this.value) ? just(this.value) : nothing()
  }

  public chain<TransformedType>(
    callbackChain: CallbackChain<Type, TransformedType>,
  ): Maybe<TransformedType> {
    const aNewMonad = callbackChain(this._value)
    return this.isMonadValueEmpty(aNewMonad) ? nothing() : aNewMonad
  }

  private isMonadValueEmpty<TransformedType>(
    aMonad: Maybe<TransformedType>,
  ): boolean {
    const result = aMonad.getSafe()
    return result.success && this.isEmpty(result.data)
  }

  public orDefault(_: Type): Type {
    return this.value
  }

  public orDefaultLazy(_: never): Type {
    return this.value
  }

  public getSafe(): GetSafeReturn<Type> {
    return {
      success: true,
      data: this.value,
    }
  }

  public reduce<TransformedType = Type>(
    reducer: (acc: TransformedType, item: Type) => TransformedType,
    initialType: TransformedType,
  ): TransformedType {
    return reducer(initialType, this._value)
  }

  public ifJust(effect: CallbackEffect<Type>): this {
    effect(this.value)
    return this
  }

  public ifNothing(_: never): this {
    return this
  }
}

export function just<Type>(value: Type): Maybe<Type> {
  return new Just(value)
}
