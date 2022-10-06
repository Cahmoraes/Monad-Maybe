type CallbackM<T> = (value: T) => any
type CallbackChainM<T> = (value: T) => Maybe<any>

export default class Maybe<T> {
  constructor(private value: T) {}

  public static of<T>(value: T): Maybe<T> {
    return new Maybe<T>(value)
  }

  public map(callbackMap: CallbackM<T>): Maybe<T> {
    if (this.isEmpty()) return Maybe.of(null) as Maybe<T>
    return Maybe.of(callbackMap(this.value))
  }

  public chain(callbackChain: CallbackChainM<T>): Maybe<T> {
    const chained = this.map(callbackChain).join() as Maybe<T>
    if (chained === null) return Maybe.of(null) as Maybe<T>
    return chained
  }

  public getOrElse<K>(defaultValue: K): T | K {
    return this.isEmpty() ? defaultValue : this.value
  }

  private join(): T {
    return this.value
  }

  private isEmpty(): boolean {
    return this.value === null || this.value === undefined
  }
}
