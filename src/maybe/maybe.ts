import { Nothing } from './nothing'

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

export interface Maybe<InitialType> {
  map<TransformedType>(
    callbackMap: Callback<InitialType, TransformedType>,
  ): Maybe<TransformedType>

  isNothing(): this is Nothing

  chain<TransformedType>(
    callbackChain: CallbackChain<InitialType, TransformedType>,
  ): Maybe<TransformedType>

  orDefault<DefaultType = InitialType>(defaultValue: DefaultType): DefaultType
  orDefault(defaultValue: InitialType): InitialType

  orDefaultLazy(
    callbackDefaultLazy: CallbackDefaultLazy<InitialType>,
  ): InitialType

  getSafe(): GetSafeReturn<InitialType>
}
