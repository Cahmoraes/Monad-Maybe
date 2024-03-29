import type { Just } from './just'
import type { Nothing } from './nothing'

export type Callback<InitialType, TransformedType> = (
  value: InitialType,
) => TransformedType

export type CallbackChain<InitialType, TransformedType> = (
  value: InitialType,
) => Maybe<TransformedType>

export type GetSafeErrorReturn = {
  success: false
}

export type GetSafeSuccessReturn<InitialType> = {
  success: true
  data: InitialType
}

export type GetSafeReturn<InitialType> =
  | GetSafeSuccessReturn<InitialType>
  | GetSafeErrorReturn

export type CallbackDefaultLazy<InitialType> = () => InitialType

export type CallbackPredicate<InitialType, NextType extends InitialType> = (
  value: InitialType,
) => value is NextType

export type CallbackEffect<InitialType> = (value: InitialType) => void

export type CallbackEffectNothing = () => void

export interface Maybe<InitialType> {
  map<TransformedType>(
    callbackMap: Callback<InitialType, TransformedType>,
  ): Maybe<TransformedType>

  isNothing(): this is Nothing

  isJust(): this is Just<InitialType>

  chain<TransformedType>(
    callbackChain: CallbackChain<InitialType, TransformedType>,
  ): Maybe<TransformedType>

  orDefault(defaultValue: InitialType): InitialType

  orDefaultLazy(
    callbackDefaultLazy: CallbackDefaultLazy<InitialType>,
  ): InitialType

  getSafe(): GetSafeReturn<InitialType>

  filter<NextType extends InitialType>(
    pred: CallbackPredicate<InitialType, NextType>,
  ): Maybe<NextType>
  filter(pred: (value: InitialType) => boolean): Maybe<InitialType>

  reduce<TransformedType = InitialType>(
    reducer: (acc: TransformedType, item: InitialType) => TransformedType,
    initialType: TransformedType,
  ): TransformedType
  reduce<TransformedType = InitialType>(
    reducer: never,
    initialType: TransformedType,
  ): TransformedType

  ifJust(effect: CallbackEffect<InitialType>): this

  ifNothing(effect: CallbackEffectNothing): this
}
