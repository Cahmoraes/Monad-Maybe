import type {
  Callback,
  CallbackChain,
  CallbackDefaultLazy,
  CallbackEffect,
  CallbackEffectNothing,
  GetSafeReturn,
  Maybe,
} from './maybe'

export class Nothing implements Maybe<Nothing> {
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

  public filter<Type>(_: never): Maybe<Type> {
    return nothing()
  }

  public orDefault<DefaultType>(defaultValue: DefaultType): DefaultType {
    return defaultValue
  }

  public orDefaultLazy<DefaultType>(
    callbackDefaultLazy: CallbackDefaultLazy<DefaultType>,
  ): DefaultType {
    return callbackDefaultLazy()
  }

  public getSafe(): GetSafeReturn<never> {
    return {
      success: false,
    }
  }

  public reduce<TransformedType = Nothing>(
    _: never,
    initialType: TransformedType,
  ): TransformedType {
    return initialType
  }

  public ifJust(_: never): this {
    return this
  }

  ifNothing(effect: CallbackEffectNothing): this {
    effect()
    return this
  }
}

export function nothing(): Nothing {
  return new Nothing()
}
