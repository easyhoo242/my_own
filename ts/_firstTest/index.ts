// function greeter(personName: string) {
//   return 'hello , ' + personName
// }

// const user = 'kobe'

// console.log(greeter(user))

interface Person {
  firstName: string
  lastName: string
}

const people = { firstName: "Jane", lastName: "User" }

function hello(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName
}

console.log(hello(people))




