// 使用js实现myPick
function myPick(todo:Object,keys:string[]){
   const obj = {}
   keys.forEach(key=>{
    if(key in todo){
        obj[key] = todo[key]  //这里报错怎么解决呢
    }
   })
   return obj
}


// 第一题
type Mypick<T,K extends keyof T> = {
    [P in K]:T[P]
}

// 实现readonly
type myReadonly<T> = {
    readonly [P in keyof T]:T[P]
}

interface Boy{
    name:string
    age:number
    sex:string
}

// 第二题
type readOnlyPerson = myReadonly<Boy>


// TupleToObject
const tuple = ['lisa','poli','hoin','love'] as const
type r = typeof tuple

// js的实现方法
function TupleToobject(array:(string | number | symbol)[]){
    const obj = {}
    array.forEach(val=>{
        obj[val] = val
    })
    return obj
}

// 遍历一个只读属性的数组
type tupleToObject<T extends readonly (string | number | symbol)[]> = {
    [p in  T[number]]:p
}

// 第四道，easyArrFirst
const first = (arr:any[])=>{
    // return arr[0] ? 'never': arr[0]
    // return arr.length > 0 ? arr[0] : 'never'
    const [first,...rest] = arr
    return first
}

// 第一种写法
type First<T extends any[]> = T extends [] ? never : T[0]
type First2<T extends any[]> = T['length'] extends 0 ? never : T[0]
type First3<T extends any[]> = T[0] extends T[number] ? T[0] :never
type First4<T extends any[]> = T extends [infer first, ... infer rest] ? first : never
// type Tail<T extends any[]>  = T extends [infer first,... infer rest] ? rest : never

type ages = [1,2,3]
type t1 = ages[number]
type t2 = First4<ages>
// type t3 = Tail<[1,2,3]>

// 第五题,获取tuple的length值
function getLength(arr:any[]){
    return arr.length
}
// tuple 一个定长的Arr
type Length<T extends readonly any[]> = T['length']
type l = Length<[1,2,3,'xxx']>


// 第六题 exclude
function myExclude(T:any[],U:any[]){
    const result = []
    for(let i=0; i<T.length; i++){
        const t = T[i]
        if(!U.includes(t)){
            result.push(t)
        }
    }
    return result
}
type MyExclude<T,U> = T extends U ? never : T
type e = Exclude<'a'|'b'|'c','b'|'d'>
type e2 = MyExclude<'a'|'b'|'c','b'|'d'>


// 第七题
type MyExtract<T,U> = T extends U ? T : never
type E = Extract<'a'|'b'|'c','b'|'d'>
type E2 = MyExtract<'a'|'b'|'c','b'|'d'>


// 第八题,实现简单的if类型
function IF(c:boolean,a:any,b:any){
    return c?a:b
}
type If<C extends boolean,T,F> = C extends true  ? T : F
type f = If<true,2,3>


// 第八题，实现concat
type Concat<T extends unknown[],U extends unknown[]> = [...T,...U]
type c = Concat<[1],[2]>



// 第九题，实现tail
type Tail<T extends any[]> = T extends [...any, infer last] ? last : never
type Tail2<T extends any[]> = [any,...T][T['length']]
type Tail3<T extends any[]> = T extends [infer first, ... infer rest] ? T[rest['length']]: never
type tail = Tail<[1,2,3]>


// 第十题，实现Includes
// 先得实现一个Equal方法
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

// js的实现写法
// js的实现写法
function includes(list,key){
    function _(list,key){
        if(list.length===0) return true
        const [first,...rest] = list
        if(first===key){
            return true
        }else{
            return _(rest,key)
        }
    }
    return _(list,key)
}
console.log(includes([1,2,3,4],4))

type Includes<T extends unknown[],K> = T extends [infer First,... infer Rest] ? 
    Equal<First,K> extends true 
        ? true 
        : Includes<Rest,K> 
    : false
type I = Includes<[1,2,3,4],4>


// 第十一题，实现push,unshift
type Push<T extends any[],U> = [...T,U]
type p = Push<[],1>


type Unshift<T extends any[],U> = [U,...T]

type Pop<T extends any[]> = T extends [...infer first, infer last] ? first : never
type pp = Pop<[1,2,3]>


