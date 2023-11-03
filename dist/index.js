'use strict';

// src/maybe/nothing.ts
var Nothing = class {
  isJust() {
    return false;
  }
  isNothing() {
    return true;
  }
  map(_) {
    return nothing();
  }
  chain(_) {
    return nothing();
  }
  filter(_) {
    return nothing();
  }
  orDefault(defaultValue) {
    return defaultValue;
  }
  orDefaultLazy(callbackDefaultLazy) {
    return callbackDefaultLazy();
  }
  getSafe() {
    return {
      success: false
    };
  }
  reduce(_, initialType) {
    return initialType;
  }
  ifJust(_) {
    return this;
  }
  ifNothing(effect) {
    effect();
    return this;
  }
};
function nothing() {
  return new Nothing();
}

// src/maybe/just.ts
var Just = class {
  constructor(_value) {
    this._value = _value;
  }
  isJust() {
    return true;
  }
  get value() {
    return this._value;
  }
  isNothing() {
    return false;
  }
  map(callbackMap) {
    const result = callbackMap(this._value);
    return this.isEmpty(result) ? nothing() : just(result);
  }
  isEmpty(aValue) {
    return aValue === void 0 || aValue === null;
  }
  filter(predicate) {
    return predicate(this.value) ? just(this.value) : nothing();
  }
  chain(callbackChain) {
    const aNewMonad = callbackChain(this._value);
    return this.isMonadValueEmpty(aNewMonad) ? nothing() : aNewMonad;
  }
  isMonadValueEmpty(aMonad) {
    const result = aMonad.getSafe();
    return result.success && this.isEmpty(result.data);
  }
  orDefault(_) {
    return this.value;
  }
  orDefaultLazy(_) {
    return this.value;
  }
  getSafe() {
    return {
      success: true,
      data: this.value
    };
  }
  reduce(reducer, initialType) {
    return reducer(initialType, this._value);
  }
  ifJust(effect) {
    effect(this.value);
    return this;
  }
  ifNothing(_) {
    return this;
  }
};
function just(value) {
  return new Just(value);
}

// src/maybe/maybe-impl.ts
var MaybeImp = class {
  /* c8 ignore next */
  constructor() {
  }
  static of(value) {
    return just(value);
  }
  static empty() {
    return nothing();
  }
};

exports.Maybe = MaybeImp;
