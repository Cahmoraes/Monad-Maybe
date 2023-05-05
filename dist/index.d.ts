type Callback<InitialType, TransformedType> = (value: InitialType) => TransformedType;
type CallbackChain<InitialType, TransformedType> = (value: InitialType) => Maybe<TransformedType>;
declare class Maybe<InitialType> {
    private readonly value;
    constructor(value: InitialType);
    static of<T>(value: T): Maybe<T>;
    map<U>(callbackMap: Callback<InitialType, U>): Maybe<U>;
    private isEmpty;
    chain<TransformedType>(callbackChain: CallbackChain<InitialType, TransformedType>): Maybe<TransformedType>;
    private join;
    getOrElse<OptionalType = InitialType>(defaultValue: OptionalType): InitialType | OptionalType;
}

export { Maybe };
