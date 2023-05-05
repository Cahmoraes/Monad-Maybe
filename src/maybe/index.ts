type Callback<InitialType, TransformedType> = (
  value: InitialType,
) => TransformedType

type CallbackChain<InitialType, TransformedType> = (
  value: InitialType,
) => Maybe<TransformedType>

export default class Maybe<InitialType> {
  constructor(private readonly value: InitialType) {}

  public static of<T>(value: T): Maybe<T> {
    return new Maybe<T>(value)
  }

  public map<TransformedType>(
    callbackMap: Callback<InitialType, TransformedType>,
  ): Maybe<TransformedType> {
    if (this.isNothing()) return Maybe.of(null) as Maybe<TransformedType>
    return Maybe.of(callbackMap(this.value))
  }

  public isNothing(): this is null | undefined {
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
}
