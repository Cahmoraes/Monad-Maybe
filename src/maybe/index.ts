type CallbackM<T, U> = (value: T) => U
type CallbackChainM<T, U> = (value: T) => Maybe<U>

export default class Maybe<T> {
  constructor(private value: T) {}

  public static of<T>(value: T): Maybe<T> {
    return new Maybe<T>(value)
  }

  public map<U>(callbackMap: CallbackM<T, U>): Maybe<U> {
    if (this.isEmpty()) return Maybe.of(null) as Maybe<U>
    return Maybe.of(callbackMap(this.value))
  }

  public chain<U>(callbackChain: CallbackChainM<T, U>): Maybe<U> {
    const chained = this.map(callbackChain).join() as Maybe<U>
    if (chained === null) return Maybe.of(null) as Maybe<U>
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
