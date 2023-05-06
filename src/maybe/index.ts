type Callback<InitialType, TransformedType> = (
  value: InitialType,
) => TransformedType

type CallbackChain<InitialType, TransformedType> = (
  value: InitialType,
) => Maybe<TransformedType>

type GetSafeErrorReturn = {
  success: false
}

type GetSafeSuccessReturn<InicialType> = {
  success: true
  data: InicialType
}

type GetSafeReturn<InicialType> =
  | GetSafeSuccessReturn<InicialType>
  | GetSafeErrorReturn

export default class Maybe<InitialType> {
  constructor(private readonly value: InitialType) {}

  public static of<T>(value: T): Maybe<T> {
    return new Maybe<T>(value)
  }

  public static empty(): Maybe<any> {
    return Maybe.of(null)
  }

  public map<TransformedType>(
    callbackMap: Callback<InitialType, TransformedType>,
  ): Maybe<TransformedType> {
    if (this.isNothing()) return Maybe.of(null) as Maybe<TransformedType>
    return Maybe.of(callbackMap(this.value))
  }

  public isNothing(): boolean {
    return this.value === null || this.value === undefined
  }

  public chain<TransformedType>(
    callbackChain: CallbackChain<InitialType, TransformedType>,
  ): Maybe<TransformedType> {
    const chained = this.map(callbackChain).join() as Maybe<TransformedType>
    if (chained === null) return Maybe.of(null) as Maybe<TransformedType>
    return chained
  }

  private join(): InitialType {
    return this.value
  }

  public getOrElse<OptionalType = InitialType>(
    defaultValue: OptionalType,
  ): InitialType | OptionalType {
    return this.isNothing() ? defaultValue : this.value
  }

  public getSafe(): GetSafeReturn<InitialType> {
    if (this.isNothing()) {
      return {
        success: false,
      }
    }
    return {
      success: true,
      data: this.value,
    }
  }
}
