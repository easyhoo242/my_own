// function greeter(personName: string) {
//   return 'hello , ' + personName
// }

// const user = 'kobe'

// console.log(greeter(user))

class Student {
  fullName: string
  constructor(public firstName, public middleInitial, public lastName) {
    this.fullName = this.firstName + ' ' + this.middleInitial + ' ' + this.lastName
  }
}

interface Person {
  firstName: string
  lastName: string
}

function hello(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName
}

let person = { firstName: "Jane", lastName: "User" }

console.log(hello(person))




