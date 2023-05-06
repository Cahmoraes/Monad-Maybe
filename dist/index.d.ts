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
    isEmpty(): this is Maybe<null>;
    chain<TransformedType>(callbackChain: CallbackChain<InitialType, TransformedType>): Maybe<TransformedType>;
    private join;
    getOrElse<DefaultType = InitialType>(defaultValue: DefaultType): InitialType | DefaultType;
    getSafe(): GetSafeReturn<InitialType>;
}

export { Maybe };
