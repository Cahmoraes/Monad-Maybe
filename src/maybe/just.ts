import type {
  Callback,
  CallbackChain,
  CallbackPredicate,
  GetSafeReturn,
  Maybe,
} from './maybe'
import { nothing } from './nothing'

export class Just<Type> implements Maybe<Type> {
  constructor(private _value: Type) {}

  filter<NextType extends Type>(
    pred: CallbackPredicate<Type, NextType>,
  ): Maybe<NextType> {
    return pred(this.value) ? just(this.value) : nothing()
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

  public chain<TransformedType>(
    callbackChain: CallbackChain<Type, TransformedType>,
  ): Maybe<TransformedType> {
    const result = callbackChain(this._value)
    return this.isEmpty(result) ? nothing() : result
  }

  public orDefault(_: never): Type {
    return this._value
  }

  public orDefaultLazy(_: never): Type {
    return this._value
  }

  public getSafe(): GetSafeReturn<Type> {
    return {
      success: true,
      data: this.value,
    }
  }

  // filter<NextType extends Type>(
  //   predicate: CallbackPredicate<Type, NextType>,
  // ): Maybe<NextType> {
  //   return predicate(this.value) ? just(this.value) : nothing()
  // }
}

export function just<Type>(value: Type): Maybe<Type> {
  return new Just(value)
}
