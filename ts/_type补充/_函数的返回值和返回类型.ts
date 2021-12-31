// 返回值 num1 num2 类型均为any
// function sum(num1, num2) {
//   return num1 + num2
// }


// 函数的返回值一般情况下可以不用加类型
// ts会根据return后面跟的语句来判断返回值的类型

// 但是有些时候为了别人用方便 就需要加类型
function sum(num1: number, num2: number): number {
  return num1 + num2
}