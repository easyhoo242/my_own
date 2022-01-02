// static 静态属性可以直接被构造函数所访问


class Student {
  static time: string = 'dc'

  static sayHello() {
    console.log('hello world')
  }
}

console.log(Student.time)
Student.sayHello()




export { }