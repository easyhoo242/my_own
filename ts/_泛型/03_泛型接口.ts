// 默认类型 
interface IInfo<T1 = string, T2 = number> {
  name: T1
  age: T2
}

const person: IInfo = {
  name: 'dc',
  age: 18
}

const person2: IInfo<number, number> = {
  name: 23,
  age: 18
}