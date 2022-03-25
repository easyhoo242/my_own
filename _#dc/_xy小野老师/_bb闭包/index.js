// 函数默认值

// es6
function test1(a = 1, b = 2) {
  console.log(a, b)
}
test1()

// es5
// 通过给实参赋值的方式来给函数增加默认值
function test(a, b) {
  a = arguments[0] || 1
  b = arguments[0] || 2
  console.log(a, b)
}
test()