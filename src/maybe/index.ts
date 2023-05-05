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

  public map<U>(callbackMap: Callback<InitialType, U>): Maybe<U> {
    if (this.isEmpty(this.value)) return Maybe.of(null) as Maybe<U>
    return Maybe.of(callbackMap(this.value))
  }

  private isEmpty(aValue: unknown): boolean {
    return aValue === null || aValue === undefined
  }

  public chain<TransformedType>(
    callbackChain: CallbackChain<InitialType, TransformedType>,
  ): Maybe<TransformedType> {
    const chained = this.map(callbackChain).join() as Maybe<TransformedType>
    if (this.isEmpty(chained)) return Maybe.of(null) as Maybe<TransformedType>
    return chained
  }

  private join(): InitialType {
    return this.value
  }

  public getOrElse<OptionalType = InitialType>(
    defaultValue: OptionalType,
  ): InitialType | OptionalType {
    return this.isEmpty(this.value) ? defaultValue : this.value
  }
}
