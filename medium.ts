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


