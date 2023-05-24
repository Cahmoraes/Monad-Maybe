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
    if (this.isNothing()) return Maybe.empty()
    return Maybe.of(callbackMap(this.value))
  }

  public isNothing(): boolean {
    return this.value === null || this.value === undefined
  }

  public chain<TransformedType>(
    callbackChain: CallbackChain<InitialType, TransformedType>,
  ): Maybe<TransformedType> {
    return this.map(callbackChain).join()
  }

  private join() {
    return this.isNothing() ? Maybe.empty() : this.value
  }

  public orDefault<DefaultType = InitialType>(
    defaultValue: DefaultType,
  ): InitialType | DefaultType {
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
