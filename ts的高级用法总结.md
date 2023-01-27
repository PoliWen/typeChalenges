# typeScript高级用法总结

### 交叉类型

> 相当于js中的Object.assign()，将两个对象的属性进行合并

```typescript
const merge = <T, U>(obj1: T,obj2: U):T & U => {
	return Object.assign(obj1, obj2) as T & U
}
merge({a:1},{b:2}) // {a:1,b:2}
```

### 联合类型

> 表示一个变量可以是A类型也可以是B类型，如下表示数组的元素既可以是string类型也可以是number类型

```typescript
const arr:(string | number)[] = [1,'aa']

// 定义方位
type Direction = 'north' | 'east' | 'south' | 'west'
function getDirectionFirstLetter(direction: Direction): string{
    return direction.substr(0,1)
}
```

### 类型守卫

#### in(属性判断）

```typescript
interface Foo {
    foo: string
}
interface Bar {
    bar: string
}

// 错误
function test(obj: Foo | Bar){
    console.log(obj.foo)  // Property 'foo' does not exist on type 'Bar'
    console.log(obj.bar)  // Property 'bar' does not exist on type 'Foo'
}

// 正确
function test(obj: Foo | Bar){
    if('foo' in Foo){    // 使用in约束范围
       console.log(obj.foo)
    }else{
        console.log(obj.bar)
    }
}
```

#### instanceof

```typescript
class Bird{
    fly(){}
    eat(){}
}
class Fish{
    swim(){}
    eat(){}
}

function getRandomAnimal(): Fish | Bird{
    return Math.random() > .5 ? new Bird() : new Fish()
}
const animal = getRandomAnimal()
if(animal instanceof Bird){
    animal.fly()
    aimal.swim() // Property 'swim' does not exist on type 'Bird'
}else{
    animal.swim()
}
```

### typeof

```typescript
// 当不知道参数的具体类型的时候，对参数进行操作会报错
function getLength(x: string | number){
    console.log(x.length)   //  Property 'length' does not exist on type 'number'.
    console.log(x.toFixed(2)) // Property 'toFixed' does not exist on type 'string'
}
getLength('hello')

// 需要使用typeof进行类型守卫

function getLength(x: string | number){
    if(typeof x === 'string'){ 
        console.log(x.length)       // ts推断出x为string类型
        console.log(x.toFixed(2))  // Property 'toFixed' does not exist on type 'string'
    }else{
        console.log(x.toFixed(2))  // ts推断出x为number类型
    }
}
getLength('hello')
```

#### is

```typescript
const isNumber = (x: unknown): boolean => typeof x === 'number'  //  这种写法不具有类型守卫的能力

// is的使用
const isNumber = (x: unknown): x is number => typeof x === 'number'
const isString = (x: unknown) : x is string => typeof x === 'string'
function padLeft(val: string, padding:string | number){
    if(isNumber(padding)){
        return Array(padding).join(' ') + val
    }else{
        return padding  + val
    }
}

// 此处的x is number, x is string是关键，只有通过is指定函数的返回类型，函数才拥有类型守卫的能力
```

### ! 的使用

> ! 用来进行非空断言，使用! 可以断言对象是非null和undefined类型

```typescript
function toLowerCase(str: string | null | undefined){
	//return str.toLowerCase() // 报错，'str' is possibly 'null' or 'undefined'
    return str!.toLowerCase()
}
```

### 枚举的使用

> 使用枚举可以增加代码的语义化，例如后端返回status参数0，1，2分别代表商品的删除，上架，下架，为了让0,1,2更具有语义化，可以定一个枚举类型

```typescript
enum Status {
    DELETE = 0,
	ONLINE = 1,
	OFFLINE = 2,
}

function getShopStatus(status: number): string{
    if(status === Status.ONLINE) return '上架'
    if(status === Status.OFFLINE) return '下架'
    if(status === Status.DELETE) return '删除'
    return 'error'
}
```

### 装饰器的使用

```



```

### extends关键字

extends有两种用法

1.表示条件判断

```typescript
type IsTwo<T> = T extends 2 ? true : false
```

2.限定范围,类型约束

```typescript
type replace<str extends string,from,to> = str extends 
```

### infer关键字

> 声明一个类型变量，用来存储在模式匹配中所捕获的数据，相当于一个占位符，使用这个占位符去提取一个表达式中的数据

例如: 获取函数的返回类型

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never 
```

获取函数的参数

```typescript
type GetParams<T> = T extends (infer P) => any ? P : never
```

### keyof关键字

> 相当于js中的Object.keys()获取一个对象的属性值

```typescript
interface Person {
	name: string
	age: number
}
function getPersonValue(p: Person, k: keyof Person){
    return p[k]
}
// keyof Person相当于 type PersonPops = 'name' | 'age'

```

如：定义一个根据对象属性获取对象值的方法

```typescript
function getValue<T,K extends keyof T>(obj: T, key: K): T[K]{
    return obj[key]
}

const obj = {
    a: 111,
    b: 222,
    c: 333
}
getValue(obj,'a') // 111
getValue(obj,'d') // 报错，对象obj中不存在属性d
```

### in 关键字

> in用来实现映射类型，相当于for in循环，用来遍历一个对象的属性，如下: 将一个对象的属性都变为只读属性

```typescript
type ReadOnly<T> = {
	readonly [P in keyof T]: T[P]
}

interface Person{
    name: string
    age: number
    sex: string
}
const person:ReadOnly<Person>{
    name: '刘德华',
    age: 48,
    sex: '男'
}
person.name = '成龙'  // 报错，只读属性不能进行修改赋值
```

### typeof关键字

> 将一个普通的js对象转化为ts类型

```typescript
const person = {
	name: '刘的华',
    age: 48,
    sex:'男'
}
type Person = typeof person
/*
typepf person 
相当于
{
    name: string
    age: number
    sex: string
}
*/

function add(a: number, b: number): number{
    return a + b
}

type AddType = typeof add  // (a:number,b:number) => number

```

**const**断言的对象，使用typeof转化的时候会变成readonly只读属性

```typescript
const person = {
	name: '刘德华',
	age: 48,
	sex: '男'
} as const

type Persontype = typeof person
/*
结果是
{
	readonly name: string
	readonly age: number
	readonly sex: string
}
*/
```

### as const关键字

> 指定一个对象为只读属性，使用了as const对变量断言之后，在进行修改会报错

```typescript
const foo = ['As const means immutable',123] as const 
foo.push(222)  // Property 'push' does not exist on type 'readonly 
foo[1] = 456  // Cannot assign to '1' because it is a read-only property
```

### 模板字面量

```typescript
// 定义css padding rule
type CssPadding = 'padding-left' | 'padding-right' | 'padding-top' | 'padding-bottom'

// 使用模板字面量改造
type Direction = 'left' | 'right' | 'top' | 'bottom'
type CssPaddding = `padding-${Direction}` // 'padding-left' | 'padding-right' | 'padding-top' | 'padding-bottom'
type MarginPadding = `margin-${Direction}` //  'margin-left' | 'margin-right' | 'margin-top' | 'margin-bottom'

// 将两个字符串拼接
type ConcatStr<S1 extends string,S2 extends string> = `${S1}-${S2}`
type TestConcat = ConcatStr<'Hello','typeScript'> // Hello-typeScript

type AddPrefix<T extends string,P extends string> = `${P}/${T}`
type TextAddPrefix = AddPrefix<'getProductList','www.bff.com'> // www.bff.com/getProductList

//如果是传递一个联合类型呢？
type TestConcat = ConcatStr<'hello' | 'welcome','word' | 'today'> 
// hello-word | hello-today | welcome-word | welcome-today
type InferRoot<T extends string> = T extends `${infer R}${Capitalize<Direction>}` ? R : T
type TestInferRoot = InferRoot<marginLeft> // margin
```

更高级的用法，使用as对key进行修改重新映射

```typescript
type Getters<T> = {
	[K in keyof T as `get${Capitalize<string & K>}`]:() => T[K]
}

interface Person {
	name: string
	age: number
	sex: string
}

type TestGetters = Getters<Person>

结果为
/*
{
	getName: () => string
	getAge: () => number
	getSex: () => string
}
*/
```

### any 与unknown

可以把任何变量定义为**any**类型，**any**类型的变量可以进行任何操作，<u>不会进行类型检查或者类型断言，不能在编译时发现错误</u>

也可以把任何类型的变量定义为**unknown**类型，但<u>必须进行类型守卫，类型断言才能对变量进行操作</u>，可以在编译时发现错误

因此我们应该尽量避免使用any，而使用unknown进行替换

```typescript
// 以下代码在编译时不会报错，但在运行时会报错
function invokeCallback(callBack: any){
    try{
        callback()
    }catch(err){
        console.error(err)
    }
}
invokeCallback(1)  // TypeError: callBack is not a function

// 使用unknown进行替换
function invokeCallback(callBack: unknown){
    try{
        callback()  // 'callBack' is of type 'unknown'.
    }catch(err){
        console.error(err)
    }
}
invokeCallback(1)

// 将any替换成unknown之后编辑器报错了,需要借助in typeof instanceof as进行类型断言和守卫解决报错
function invokeCallback(callBack: unknown){
    try{
        if(typeof callBack === 'function'){ // 加上类型守卫，则不会报错
           	callback() 
        }
    }catch(err){
        console.error(err)
    }
}
invokeCallback(1)

```
### 函数重载

我们知道很多库中都大量使用了函数重载，例如vue3，vueuse中，那么什么是函数重载

```

```

### 内置高级类型实现

### Partial

> 转化为可选属性

```typescript
type Mypartial<T> = {
	[P in keyof T]?: T[P]
}
```

#### Required

> 转化为必选属性

```typescript
type MyRequired<T> = {
    [P in keyof T]-?:T[P]
}
```

#### Readonly

> 转化为可读属性

```typescript
type MyReadonly<T> = {
    readonly [P in keyof T]: T[P]
}
```

#### Pick

> 读取指定属性的值

```typescript
type MyPick<T,K extends keyof T> =  {
    [P in K]: T[P]
}
```

#### Exclude

> 取差集，排除

```typescript
type MyExclude<T,U> = T extends U ? never : T
type test = MyExclude<string | number | boolean, string | number> // boolean
```

#### Extract

> 取并集，提取

```typescript
type MyExtact<T,U> = T extends U ? T : never
type test = MyExtact<string | number | boolean, string | number> // string | number
```

#### Omit

> 读取与指定属性相反的属性的值

````typescript
type MyOmit<T,K extends keyof any> = Pick<T, Exclude<keyof T,K>>
````

#### Record

> 根据指定的key和value生成一个新的类型

````typescript
type MyRecord<K extends keyof any, T> = {
    [P in K]: T
}

type Test = MyRecord<'a'|'b'|'c', number>
const testRecord:Test = {
    a: 1,
    b: 2,
    c: 3
}
````

#### Parameters

> 获取函数参数的类型

```typescript
type MyParameters<T extends (...args:any) => any> = T extends (...args: infer P) => any ? P : never

function add(a: number, b: number): number{
    return a + b
}
type Test = MyParameters<typeof add> // [a: number, b: number]
```

#### ReturnType

> 获取函数返回的值的类型

````typescript
type MyReturnType<T extends (...args: any) => any> = T extends (...args: any)=> infer R ? R : any

function add(a: number, b: number): number{
    return a + b
}
type Test = MyReturnType<typeof add> // number
````

