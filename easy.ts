type MyPick<T,K extends keyof T> = {
    [P in K]:T[P]
}
type TestMyPick = MyPick<{a:1,b:2},'a'>

type MyReadOnly<T>={
    readonly [P in keyof T]:T[P]
}
type TestMyReadOnly = MyReadOnly<{a:1,b:2}>

type MyTupleToObject<T extends readonly (string|number)[]> = {
    [P in T[number]]:P
}
const tupleNumber = [1, 2, 3, 4] as const
type TestMyTupleToObject = MyTupleToObject<typeof tupleNumber>

type FirstOfArray<T extends any[]>= T extends [infer first,... infer rest] ? first : never
type FirstOfArray2<T extends any[]> = T extends []? never: T[0]
type FirstOfArray3<T extends any[]> = T['length'] extends 0 []? never: T[0]
type TestFirstOfArray = FirstOfArray<[1,2,3]>
type TestFirstOfArray2 = FirstOfArray2<[1,2,3]>
type TestFirstOfArray3 = FirstOfArray3<[1,2,3]>

type LengthOfTuple<T extends readonly any[]> = T['length']

type MyExcludes<T,U> = T extends U ? never : T
type TestMyExcludes = MyExcludes<'a'| 'b' | 'c','c' | 'd'>

type MyConcat<T extends unknown[],U extends unknown[]>=[...T,...U]
type TestMyConcat=MyConcat<[1,2],[3,4]>

type MyIf<B extends boolean,E,F>= B extends true? E: F
type TestMyIf = MyIf<true,1,2>


type MyPush<T extends unknown[],U> = [...T,U]
type TestMyPush = MyPush<[1,2,3],4>

type MyUnShift<T extends unknown[],U> = [U,...T]
type TestMyUnShift = MyUnShift<[2,3],1>

type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer X> 
? X extends Promise<unknown> 
  ? MyAwaited<X> 
  : X 
: never
type X = Promise<string>
type TestMyAwaited = MyAwaited<X>

type MyParameters<T extends (...args:any)=> any>= T extends (...args: infer P)=> any ? P: never

const foo = (arg1: string, arg2: number): void => {}
type testMyParamters = MyParameters<typeof foo>

type Zip<first extends unknown[],second extends unknown[]> = 
    first extends [infer f1,infer s1] ? 
         second extends [infer f2,infer s2] ? 
         [[f1,f2],[s1,s2]] 
         :
         []
    :
    []


