// medium部分
type GetReturnType<T extends (...args:any)=>any>=T extends (...args:any)=> infer R? R:never
const add=(a:number,b:number)=>a+b
type TestGetReturnType = GetReturnType<typeof add>

type MyOmit<T,K extends keyof T>=Pick<T,Exclude<keyof T,K>>
type TestMyOmit = MyOmit<{a:1,b:2,c:3},'a'|'b'>

type MyReadonly2<T,K extends keyof T = keyof T>={
    readonly [P in K]:T[P]
} & {
    [P in Exclude<keyof T,K>]:T[P]
}

interface Todo {
    title: string
    description: string
    completed: boolean
}

const todo: MyReadOnly2<Todo, 'title' | 'description'> = {
    title: "Hey",
    description: "foobar",
    completed: false,
}

type TestReadOnly2 = MyReadonly2<Todo, 'title' | 'description'>

type Pop<T extends unknown[]>= T extends [...infer F, infer L] ? F : never

type Last<T extends unknown[]>= T extends [...infer F,infer L] ? L : never
type TestLast = Last<[1,2,3]>

type TestPop=Pop<[1,2,3]>

type TrimLeft<Str extends string> = Str extends `${' '|'\n'|'\t'}${infer Rest}` ? TrimLeft<Rest> : Str 

type TestTrimLeft = TrimLeft<'   hello'>

type TrimRight<Str extends string> = Str extends `${infer Rest}${' '|'\n'|'\t'}` ? TrimRight<Rest>: Str
type TestTrimRight = TrimRight<'hello   '>

type Trim<Str extends string> = TrimRight<TrimLeft<Str>>

type TestTrim = Trim<'   hello   '>

type StartsWith<T extends string,P extends string> = T extends `${P}${string}` ? true : false

type TestStartWidth = StartWith<'abc','ac'>

type EndWith<T extends string,E extends string> = T extends `${string}${E}` ? true : false
type TestStartEndWith= EndWith<'abc','bc'>

type StringToArray<S extends string> = 
    S extends `${infer F}${infer R}` 
        ? [F, ...StringToArray<R>] 
        : []

type LengthOfString<S extends string> = StringToArray<S>['length']

type TestLengthOfString=LengthOfString<'hello'>

type Replace<S extends string,From extends string,To extends string> = 
    From extends '' 
    ? S 
    : S extends `${infer F}${From}${infer R}` 
        ? `${F}${To}${R}`
        : S

type TestReplace=Replace<'hellou','l','o'>



type ReplaceAll<S extends string,From extends string,To extends string> = 
    From extends '' 
    ? S 
    : S extends `${infer F}${From}${infer R}` 
        ? `${F}${To}${ReplaceAll<R,From,To>}`
        : S

type TestReplaceAll = ReplaceAll<'hellou','l','o'>

type DeepReadonly<T>={
    readonly [P in keyof T]:keyof T[P] extends never ? T[P] : DeepReadonly <T[P]>
}

type X = { 
    x: { 
      a: 1
      b: 'hi'
    }
    y: 'hey'
  }
  
type TestDeepReadonly= DeepReadonly<X>


type MyCapitalize<T extends string> = T extends `${infer F}${infer R}` ? `${Uppercase<F>}${R}` : T

type TestMyCapitalize = MyCapitalize<'hello world'>


type Zip<F extends unknown[],S extends unknown[]>=
    [F,S] extends [[infer L,...infer restF],[infer R,...infer restS]] ? 
    [[L,R],...Zip<restF,restS>]
    :
    []
type TestZip = Zip<[1,2],['First','second']>


type CamelCase<S extends string> = 
    S extends `${infer left}_${infer right}${infer rest}` 
    ? `${Lowercase<left>}${Uppercase<right>}${CamelCase<rest>}` 
    : Lowercase<S>

type TestCamelCase=CamelCase<'dog_dog_dog'>

type DropChar<T extends string,R extends string> = 
  T extends `${infer left}${R}${infer rest}` ? 
  `${left}${DropChar<rest,R>}`
  : T

type TestDropString=DropChar<'butter fly!', 'but'>

type ReverseArr<T extends unknown[]> = T extends [infer first,...infer rest] ? [...ReverseArr<rest>,first]: T
type TestReverseArr =  ReverseArr<[1,2,3,4,5]>

type StringToUnion<T extends string> = 
    T extends `${infer F}${infer Rest}` ?
    F | StringToUnion<Rest>
    : never


type ReverseString<T extends string,result extends string=''> = 
    T extends `${infer first}${infer rest}`?
    ReverseString<rest,`${first}${result}`>
    : result

type TestReverseString = ReverseString<'123'>

type IsAny<T> = 'ddd' extends ('ggg' & T)? true:false // 用any和任意类型交叉都是any类型的特点
type TestIsAny = IsAny<'tttt'>

type IsUnion<A,B = A> = 
  A extends A 
  ? [B] extends [A] 
        ? false
        : true
  : never

type TestIsUnion = IsUnion<'a'|'b'>

type IsNever<T> = [T] extends [never] ? true : false
type TestIsNever = IsNever<never>

// 疑问点：ts中类型用[]包裹起来是什么意思
type Foo = {
    name: string
    age: string
}
type Bar = {
    name: string
    age: string
    gender: number
}
type Coo = {
    name: string
    gender: number
}
type diff<T,U> = Omit<T & U,keyof T & keyof U>
type TestDiff = diff<Foo,Bar>

type KebabCase<Str extends string> = 
    Str extends `${infer First}${infer Rest}`
        ? First extends Lowercase<First> 
            ? `${First}${KebabCase<Rest>}`
            : `-${Lowercase<First>}${KebabCase<Rest>}`
        : Str;