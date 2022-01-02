// 类型的参数化

// 在定义函数时 不决定函数的参数
// 而是让调用者以参数的形式告知 这里的函数参数是什么类型

type InfoType = number | string

// 箭头函数
const printInfo = <T>(info: T): T => {
  console.log(info)
  return info
}
printInfo<InfoType>('dcCd')

// 普通函数
function getInfo<T>(info: T): T {
  return info
}
// 确定类型 
getInfo<InfoType>('abc')

// 类型推导
// 字面量类型
getInfo(50)