### typeScript掘金小册阅读笔记

### 第一章节

**为什么要使用typescript：**

js是一种弱类型语言，在编译时不会进行类型检查，不易发现错误，在编码过程中会隐藏许多隐患，这些隐患会在运行时暴露，由于弱类型的特性，导致编码不严谨，写的很随意

**而采用typeScript对类型

typeScript在编译时就会进行类型检查，提示错误信息，能够减少在运行时的错误，同时对变量进行类型约束能够提供类型提示，增强了代码的健壮性，严谨性

### 第二章节

**为什么叫做类型体操**:

拥有泛型（类型参数），可以进行类型编程，通过一些规则可以写出来很多复杂的类型

### 第三章节

有哪些类型和支持哪些类型运算？

js的基本类型，typeScript全都有如：string, number, boolean, null, Object, function, Array, undefined, symbol

同时新增了：Tuple, InterFace, Enum

Tuple:  长度和类型固定的数组

```typescript
type tuple = [1,2,3]
```

Interface: 用来描述对象，函数，构造器的结构

```typescript
// 对象
interface Person = {
	name:string
	age:number
}

// 函数
interface sayHi{
	(name:string):string
}

// 构造器
interface PersonConstr{
    new(name:string,age:number):Person
}
```

四种特殊的类型

**void**返回值为空，可以是undefined或者never

**never**代表不可达，函数抛出异常

**any**任意类型，任何类型都可以赋值给它，它也可以赋值给任意类型

**unknown**未知类型，任何类型都可以赋值给它，它不可以赋值给别的类型

























