type Callback<InitialType, TransformedType> = (value: InitialType) => TransformedType;
type CallbackChain<InitialType, TransformedType> = (value: InitialType) => Maybe<TransformedType>;
declare class Maybe<InitialType> {
    private readonly value;
    constructor(value: InitialType);
    static of<T>(value: T): Maybe<T>;
    map<TransformedType>(callbackMap: Callback<InitialType, TransformedType>): Maybe<TransformedType>;
    isNothing(): this is null | undefined;
    chain<TransformedType>(callbackChain: CallbackChain<InitialType, TransformedType>): Maybe<TransformedType>;
    private join;
    getOrElse<OptionalType = InitialType>(defaultValue: OptionalType): InitialType | OptionalType;
}

export { Maybe };
