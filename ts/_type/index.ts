// 布尔值
let done: boolean = false
// 数字
let countInt: number = 123
let countFloat: number = 12.3
let countDouble: number = 12.12312319827398
// 数组
const arrNum: number[] = [1, 2, 3]
const arrNumC: Array<number> = [1, 2, 3]
console.log(arrNum)
const arrStr: string[] = ['1', '2', '3']
const arrStrC: Array<string> = ['1', '2', '3']
console.log(arrStr)
// 元组 Tuple
let x: [string, number]
x = ['123', 123]
// x = [123, '123']   //error

// Any
let notSure: any = 4
notSure = 'i am notSure'
notSure = false
// 可以是任意类型

// Any和Object的区别
notSure.toFixed()

let prettySure: Object = 4
// prettySure.toFixed()   //  无法调用

// 混合类型用any
let arrFix: any = [1, '234', true]

// void 和 any 类型基本相反

// 没有返回值的函数 其返回值就是void类型
function warnUser(): void {
  console.log(`it is a wrong message`)
}

// void表示没有任何类型  null undefined
let unusable: void = null
unusable = undefined

// never类型

// 返回never类型的函数
// 存在无法到达的中终点
function throwNewError(message: string): never {
  throw new Error(message)
}

// 推断的返回值类型为never
function fail() {
  return throwNewError('Something failed')
}

// 存在无法到达的中终点
function infiniteLoop(): never {
  while (true) {

  }
}








class AMan {
  fullName: string
  constructor(public firstName: string, public middleInitial: string, public lastName: string) {
    this.fullName = this.firstName + ' ' + this.middleInitial + ' ' + this.lastName
  }
}

interface Person {
  name: string,
  age: number
}

const person = {
  name: 'dc',
  age: 33
}

const whatTheManSay = `well , i am ${person.name}, 
                      i'm going to ${person.age} next month`

