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

let x: [string, number]
x = ['123', 123]
// x = [123, '123']   //error


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

