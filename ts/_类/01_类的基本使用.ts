class Person {
  name: string
  age: number

  // 定义的属性必须初始化 可以直接写
  // name: string = ''
  // age: number = age

  // 也可以在constructor里面写
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  eating() {
    console.log(this.name + ' eating')
  }
}


const p = new Person('dc', 18)

console.log(p.name)
console.log(p.age)
p.eating()