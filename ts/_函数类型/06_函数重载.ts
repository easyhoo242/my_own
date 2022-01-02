
// 以下两个重载没有函数体
function add(n1: number, n2: number): number;
function add(n1: string, n2: string): string;

// 定义的类型比较宽泛
function add(n1: any, n2: any) {
  return n1 + n2
}


// 重载的类型
// function add(n1: string, n2: string): string (+1 overload)
add(20, 30)
// function add(n1: string, n2: string): string (+1 overload)
add('dc', 'cd')

// 没有与此调用匹配的重载。
//   第 1 个重载(共 2 个)，“(n1: number, n2: number): number”，出现以下错误。
//     类型“string”的参数不能赋给类型“number”的参数。
//   第 2 个重载(共 2 个)，“(n1: string, n2: string): string”，出现以下错误。
//     类型“number”的参数不能赋给类型“string”的参数。ts(2769)

// 默认会优先匹配第一个
// 但是全都匹配不到 所以不能用
// 只能使用上面已经定义好的重载类型

// add({name: 'dc'}, {age: 28})  //不可用