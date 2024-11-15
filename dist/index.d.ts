declare class Just<Type> implements Maybe<Type> {
    private _value;
    constructor(_value: Type);
    isJust(): this is Just<Type>;
    private get value();
    isNothing(): boolean;
    map<TransformedType>(callbackMap: Callback<Type, TransformedType>): Maybe<TransformedType>;
    private isEmpty;
    filter<NextType extends Type>(predicate: CallbackPredicate<Type, NextType>): Maybe<NextType>;
    chain<TransformedType>(callbackChain: CallbackChain<Type, TransformedType>): Maybe<TransformedType>;
    private isMonadValueEmpty;
    orDefault(_: Type): Type;
    orDefaultLazy(_: never): Type;
    getSafe(): GetSafeReturn<Type>;
    reduce<TransformedType = Type>(reducer: (acc: TransformedType, item: Type) => TransformedType, initialType: TransformedType): TransformedType;
    ifJust(effect: CallbackEffect<Type>): this;
    ifNothing(_: never): this;
}

declare class Nothing implements Maybe<Nothing> {
    isJust(): boolean;
    isNothing(): this is Nothing;
    map<TransformedType>(_: Callback<never, TransformedType>): Maybe<TransformedType>;
    chain<TransformedType>(_: CallbackChain<never, TransformedType>): Maybe<TransformedType>;
    filter<Type>(_: never): Maybe<Type>;
    orDefault<DefaultType>(defaultValue: DefaultType): DefaultType;
    orDefaultLazy<DefaultType>(callbackDefaultLazy: CallbackDefaultLazy<DefaultType>): DefaultType;
    getSafe(): GetSafeReturn<never>;
    reduce<TransformedType = Nothing>(_: never, initialType: TransformedType): TransformedType;
    ifJust(_: never): this;
    ifNothing(effect: CallbackEffectNothing): this;
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
type CallbackEffect<InitialType> = (value: InitialType) => void;
type CallbackEffectNothing = () => void;
interface Maybe<InitialType> {
    map<TransformedType>(callbackMap: Callback<InitialType, TransformedType>): Maybe<TransformedType>;
    isNothing(): this is Nothing;
    isJust(): this is Just<InitialType>;
    chain<TransformedType>(callbackChain: CallbackChain<InitialType, TransformedType>): Maybe<TransformedType>;
    orDefault(defaultValue: InitialType): InitialType;
    orDefaultLazy(callbackDefaultLazy: CallbackDefaultLazy<InitialType>): InitialType;
    getSafe(): GetSafeReturn<InitialType>;
    filter<NextType extends InitialType>(pred: CallbackPredicate<InitialType, NextType>): Maybe<NextType>;
    filter(pred: (value: InitialType) => boolean): Maybe<InitialType>;
    reduce<TransformedType = InitialType>(reducer: (acc: TransformedType, item: InitialType) => TransformedType, initialType: TransformedType): TransformedType;
    reduce<TransformedType = InitialType>(reducer: never, initialType: TransformedType): TransformedType;
    ifJust(effect: CallbackEffect<InitialType>): this;
    ifNothing(effect: CallbackEffectNothing): this;
}

declare class MaybeImp {
    private constructor();
    static of<Type>(value: Type): Maybe<Type>;
    static empty<Type>(): Maybe<Type>;
}

export { MaybeImp as Maybe, type Maybe as MaybeType };
