type ExCludeType<T,U> = T extends U ? never : T
type excludeTest = ExCludeType<'a'| 'b' | 'c','c' | 'd'>

const tupleNumber = [1, 2, 3, 4] as const
type MyTupleToObject<T extends readonly (string|number)[]> = {
    [P in T[number]]:P
}
type cases = MyTupleToObject<typeof tupleNumber>

