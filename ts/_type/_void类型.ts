// 当函数没有返回值的时候 默认为void 
// 也可以手动声明
const sum = (sum1: number, sum2: number): void => {
  console.log(sum1 + sum2)
}

sum(20, 30)

// sum('abc', 'bgc')