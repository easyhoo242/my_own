// 感觉和type没有什么区别
interface IInfoType {
  readonly name: string
  age: number
  friend?: {
    name: string
  }
}

const person: IInfoType = {
  name: 'dc',
  age: 18,
  friend: {
    name: 'cd'
  }
}
