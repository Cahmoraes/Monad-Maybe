import type { Maybe } from './maybe'
import { just } from './just'
import { nothing } from './nothing'

export default class MaybeImp {
  /* c8 ignore next */
  private constructor() {}

  public static of<Type>(value: Type): Maybe<Type> {
    return just<Type>(value)
  }

  public static empty<Type>(): Maybe<Type> {
    return nothing()
  }
}
