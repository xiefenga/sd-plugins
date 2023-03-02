
// export function compose<A, B, C>(
//   f1: (b: B) => C,
//   f2: (a: A) => B
// ): (a: A) => C
// export function compose<A, B, C, D>(
//   f1: (b: C) => D,
//   f2: (a: B) => C,
//   f3: (a: A) => B
// ): (a: A) => D
// export function compose<A, B, C, D, E>(
//   f1: (b: D) => E,
//   f2: (a: C) => D,
//   f3: (a: B) => C,
//   f4: (a: A) => B
// ): (a: A) => E
//
// export function compose <Result>(
//   f1: (a: any) => Result,
//   ...functions: ((a: any) => Result)[]
// ): (a: any) => Result

export const compose = <Result>(...funcs: ((a: any) => Result)[]): (a: any) => Result => {
  if (funcs.length === 0) {
    return args => args
  } else if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}