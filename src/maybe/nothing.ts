import type { Callback, CallbackChain, GetSafeReturn, Maybe } from './maybe'

export class Nothing implements Maybe<Nothing> {
  private _value!: never

  public orDefault<DefaultType>(defaultValue: DefaultType): DefaultType {
    return defaultValue
  }

  public map<TransformedType>(
    _: Callback<never, TransformedType>,
  ): Maybe<TransformedType> {
    return nothing()
  }

  public isNothing(): this is Nothing {
    return true
  }

  public chain<TransformedType>(
    _: CallbackChain<never, TransformedType>,
  ): Maybe<TransformedType> {
    return nothing()
  }

  public getSafe(): GetSafeReturn<never> {
    return {
      success: false,
    }
  }
}

export function nothing(): Nothing {
  return new Nothing()
}
