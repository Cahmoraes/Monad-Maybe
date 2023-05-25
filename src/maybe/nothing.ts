import type {
  Callback,
  CallbackChain,
  CallbackDefaultLazy,
  GetSafeReturn,
  Maybe,
} from './maybe'

export class Nothing implements Maybe<Nothing> {
  private value!: never

  public isNothing(): this is Nothing {
    return true
  }

  public map<TransformedType>(
    _: Callback<never, TransformedType>,
  ): Maybe<TransformedType> {
    return nothing()
  }

  public chain<TransformedType>(
    _: CallbackChain<never, TransformedType>,
  ): Maybe<TransformedType> {
    return nothing()
  }

  public orDefault<DefaultType>(defaultValue: DefaultType): DefaultType {
    return defaultValue
  }

  public orDefaultLazy<T>(callbackDefaultLazy: CallbackDefaultLazy<T>): T {
    return callbackDefaultLazy()
  }

  public getSafe(): GetSafeReturn<never> {
    return {
      success: false,
    }
  }

  public filter<Type>(_: never): Maybe<Type> {
    return nothing()
  }
}

export function nothing(): Nothing {
  return new Nothing()
}
