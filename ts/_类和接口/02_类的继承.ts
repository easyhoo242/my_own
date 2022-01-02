class Person {
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }


  eating() {
    console.log(this.name + ' eating')
  }
}



class Student extends Person {
  no: number | string
  constructor(name: string, age: number, no: number | string) {
    super(name, age)
    this.no = no
  }

  studying(): void {
    console.log(this.name + 'studying')
  }
}

class Teacher extends Person {
  teach: string

  constructor(name: string, age: number, teach: string) {
    // 继承自父类的属性
    super(name, age)
    this.teach = teach
  }

  eating(): void {
    // 继承自父类的方法
    super.eating()
    console.log(this.name + ' teacher eating')
  }

  teaching() {
    console.log(this.name + ' teaching')
  }
}

const t = new Teacher('dc', 18, 'six')
console.log(t.name)
console.log(t.age)
console.log(t.teach)
t.eating()
t.teaching


export { }