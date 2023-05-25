declare class Nothing implements Maybe<Nothing> {
    private _value;
    orDefault<DefaultType>(defaultValue: DefaultType): DefaultType;
    map<TransformedType>(_: Callback<never, TransformedType>): Maybe<TransformedType>;
    isNothing(): this is Nothing;
    chain<TransformedType>(_: CallbackChain<never, TransformedType>): Maybe<TransformedType>;
    getSafe(): GetSafeReturn<never>;
}

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
interface Maybe<InitialType> {
    map<TransformedType>(callbackMap: Callback<InitialType, TransformedType>): Maybe<TransformedType>;
    isNothing(): this is Nothing;
    chain<TransformedType>(callbackChain: CallbackChain<InitialType, TransformedType>): Maybe<TransformedType>;
    orDefault<DefaultType = InitialType>(defaultValue: DefaultType): DefaultType;
    orDefault(defaultValue: InitialType): InitialType;
    getSafe(): GetSafeReturn<InitialType>;
}

declare class MaybeImp {
    static of<Type>(value: Type): Maybe<Type>;
    static empty<Type>(): Maybe<Type>;
}

export { MaybeImp as Maybe };
