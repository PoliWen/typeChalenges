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