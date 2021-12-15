// function greeter(personName: string) {
//   return 'hello , ' + personName
// }
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = { firstName: "Jane", lastName: "User" };
document.body.innerHTML = greeter(user);
