// 均为es6的内容

// 剩余参数
const sum = (...numbers: number[]) => {
  let total: number
  for (const number of numbers) {
    total += number
  }
  return total
}

sum(20, 30)
sum(20, 30, 40)
sum(20, 30, 40, 50)


// 可选参数

const printProp = (id: number, name?: string) => {
  console.log(id, name)
}

const printPropC = (id: number, name: string | undefined) => {
  console.log(id, name)
}



export { }