declare class Nothing implements Maybe<Nothing> {
    isNothing(): this is Nothing;
    map<TransformedType>(_: Callback<never, TransformedType>): Maybe<TransformedType>;
    chain<TransformedType>(_: CallbackChain<never, TransformedType>): Maybe<TransformedType>;
    filter<Type>(_: never): Maybe<Type>;
    orDefault<DefaultType>(defaultValue: DefaultType): DefaultType;
    orDefaultLazy<T>(callbackDefaultLazy: CallbackDefaultLazy<T>): T;
    getSafe(): GetSafeReturn<never>;
}

type Callback<InitialType, TransformedType> = (value: InitialType) => TransformedType;
type CallbackChain<InitialType, TransformedType> = (value: InitialType) => Maybe<TransformedType>;
type GetSafeErrorReturn = {
    success: false;
};
type GetSafeSuccessReturn<InitialType> = {
    success: true;
    data: InitialType;
};
type GetSafeReturn<InitialType> = GetSafeSuccessReturn<InitialType> | GetSafeErrorReturn;
type CallbackDefaultLazy<InitialType> = () => InitialType;
type CallbackPredicate<InitialType, NextType extends InitialType> = (value: InitialType) => value is NextType;
interface Maybe<InitialType> {
    map<TransformedType>(callbackMap: Callback<InitialType, TransformedType>): Maybe<TransformedType>;
    isNothing(): this is Nothing;
    chain<TransformedType>(callbackChain: CallbackChain<InitialType, TransformedType>): Maybe<TransformedType>;
    orDefault<DefaultType = InitialType>(defaultValue: DefaultType): DefaultType;
    orDefault(defaultValue: InitialType): InitialType;
    orDefaultLazy(callbackDefaultLazy: CallbackDefaultLazy<InitialType>): InitialType;
    getSafe(): GetSafeReturn<InitialType>;
    filter<NextType extends InitialType>(pred: CallbackPredicate<InitialType, NextType>): Maybe<NextType>;
    filter(pred: (value: InitialType) => boolean): Maybe<InitialType>;
}

declare class MaybeImp {
    static of<Type>(value: Type): Maybe<Type>;
    static empty<Type>(): Maybe<Type>;
}

export { MaybeImp as Maybe };
