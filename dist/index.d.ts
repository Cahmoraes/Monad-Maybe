type CallbackM<T, K> = (value: T) => K;
type CallbackChainM<T, K> = (value: T) => Maybe<K>;
declare class Maybe<T> {
    private value;
    constructor(value: T);
    static of<T>(value: T): Maybe<T>;
    map<U>(callbackMap: CallbackM<T, U>): Maybe<U>;
    chain<K>(callbackChain: CallbackChainM<T, K>): Maybe<K>;
    getOrElse<K>(defaultValue: K): T | K;
    private join;
    private isEmpty;
}

export { Maybe };
