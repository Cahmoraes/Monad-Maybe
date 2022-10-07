declare type CallbackM<T, U> = (value: T) => U;
declare type CallbackChainM<T, U> = (value: T) => Maybe<U>;
declare class Maybe<T> {
    private value;
    constructor(value: T);
    static of<T>(value: T): Maybe<T>;
    map<U>(callbackMap: CallbackM<T, U>): Maybe<U>;
    chain<U>(callbackChain: CallbackChainM<T, U>): Maybe<U>;
    getOrElse<K>(defaultValue: K): T | K;
    private join;
    private isEmpty;
}

export { Maybe };
