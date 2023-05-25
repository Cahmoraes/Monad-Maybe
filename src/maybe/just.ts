import type { Callback, CallbackChain, GetSafeReturn, Maybe } from './maybe'
import { nothing } from './nothing'

export class Just<Type> implements Maybe<Type> {
  constructor(private _value: Type) {}

  private get value() {
    return this._value
  }

  orDefault(_: never): Type {
    return this._value
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

  public isNothing(): boolean {
    return false
  }

  public chain<TransformedType>(
    callbackChain: CallbackChain<Type, TransformedType>,
  ): Maybe<TransformedType> {
    const result = callbackChain(this._value)
    return this.isEmpty(result) ? nothing() : result
  }

  public getSafe(): GetSafeReturn<Type> {
    return {
      success: true,
      data: this.value,
    }
  }
}

export function just<Type>(value: Type): Just<Type> {
  return new Just(value)
}
