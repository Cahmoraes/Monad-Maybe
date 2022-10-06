declare type CallbackM<T> = (value: T) => any;
declare type CallbackChainM<T> = (value: T) => Maybe<any>;
declare class Maybe<T> {
    private value;
    constructor(value: T);
    static of<T>(value: T): Maybe<T>;
    map(callbackMap: CallbackM<T>): Maybe<T>;
    chain(callbackChain: CallbackChainM<T>): Maybe<T>;
    getOrElse<K>(defaultValue: K): T | K;
    private join;
    private isEmpty;
}

export { Maybe };
