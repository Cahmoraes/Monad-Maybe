import type { Maybe } from './maybe'
import { just } from './just'
import { nothing } from './nothing'

export default class MaybeImp {
  public static of<Type>(value: Type): Maybe<Type> {
    return just<Type>(value)
  }

  public static empty<Type>(): Maybe<Type> {
    return nothing()
  }
}
