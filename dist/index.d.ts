type Callback<InitialType, TransformedType> = (value: InitialType) => TransformedType;
type CallbackChain<InitialType, TransformedType> = (value: InitialType) => Maybe<TransformedType>;
type GetSafeErrorReturn = {
    success: false;
};
type GetSafeSuccessReturn<InicialType> = {
    success: true;
    data: InicialType;
};
type GetSafeReturn<InicialType> = GetSafeSuccessReturn<InicialType> | GetSafeErrorReturn;
declare class Maybe<InitialType> {
    private readonly value;
    constructor(value: InitialType);
    static of<T>(value: T): Maybe<T>;
    static empty(): Maybe<any>;
    map<TransformedType>(callbackMap: Callback<InitialType, TransformedType>): Maybe<TransformedType>;
    isNothing(): this is null | undefined;
    chain<TransformedType>(callbackChain: CallbackChain<InitialType, TransformedType>): Maybe<TransformedType>;
    private join;
    getOrElse<OptionalType = InitialType>(defaultValue: OptionalType): InitialType | OptionalType;
    getSafe(): GetSafeReturn<InitialType>;
}

export { Maybe };
