type CallbackM<T, K> = (value: T) => K
type CallbackChainM<T, K> = (value: T) => Maybe<K>

export default class Maybe<T> {
  constructor(private value: T) {}

  public static of<T>(value: T): Maybe<T> {
    return new Maybe<T>(value)
  }

  public map<U>(callbackMap: CallbackM<T, U>): Maybe<U> {
    if (this.isEmpty()) return Maybe.of(null) as Maybe<U>
    return Maybe.of(callbackMap(this.value))
  }

  public chain<K>(callbackChain: CallbackChainM<T, K>): Maybe<K> {
    const chained = this.map(callbackChain).join() as Maybe<K>
    if (chained === null) return Maybe.of(null) as Maybe<K>
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
