// 对象推荐用interface

// 两个相同的接口可以同时存在
interface IInfo {
  name: string
}
interface IInfo {
  age: number
}
// 可以重复命名
// interface IInfo {
//   name: string
//   age: number
// }

// 可以看到 是取并集
// 单独使用的话则会报错
const info: IInfo = {
  name: 'dc',
  age: 18
}

// 实例

// 由于interface拥有相同名称的接口取并集的特性 所以可以使用以下方式

// 需求： 给window下增加一个age属性
interface Window {
  age: string
}


// window.age = 18


// 非对象推荐用type

// 根本区别
// type只能有一个  别名不能重复

type InfoType = {
  name: string
  age: number
}



export { }