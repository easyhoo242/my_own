// 函数作为参数时 如何编写类型

type funcType = () => void

const foo = (fn: funcType) => {
  fn()
}

type sumType = (val1: number, val: number) => number

const sum: sumType = (num1: number, num2: number) => {
  return num1 + num2
}

sum(20, 30) 


export { }