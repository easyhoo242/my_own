// function greeter(personName: string) {
//   return 'hello , ' + personName
// }
// const user = 'kobe'
// console.log(greeter(user))
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = this.firstName + ' ' + this.middleInitial + ' ' + this.lastName;
    }
    return Student;
}());
function hello(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var person = { firstName: "Jane", lastName: "User" };
console.log(hello(person));
