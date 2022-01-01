// 1. Element
// 缩小范围  从HTMLElement  到  HTMLImageElement
const el = document.getElementById('div')
const imgEl = document.getElementById('img') as HTMLImageElement



// 2. 类

class Person {

}

class Student extends Person {
  studying() {
    console.log('学习中')
  }
}

function sayHello(p: Person) {
  // 类型断言 缩小了p的范围
  // Person -> Student
  (p as Student).studying()
}

const stu = new Student()

sayHello(stu)




// 3. 不推荐的方法

const msg = 'hello World'

const num1 = (msg as any) as number
const num2 = (msg as unknown) as number


export { }