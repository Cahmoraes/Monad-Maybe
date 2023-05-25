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

export type GetSafeSuccessReturn<InicialType> = {
  success: true
  data: InicialType
}

export type GetSafeReturn<InicialType> =
  | GetSafeSuccessReturn<InicialType>
  | GetSafeErrorReturn

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

  getSafe(): GetSafeReturn<InitialType>
}
