// 类型的写法
// type CalcFnType = (n1: number, n2: number) => number

// 接口的写法
interface CalcFnType {
  (n1: number, n2: number): number
}


const calc = (n1: number, n2: number, calcFn: CalcFnType) => {
  return calcFn(n1, n2)
}

const add: CalcFnType = (n1: number, n2: number) => {
  return n1 + n2
}

calc(20, 30, add)


export { }