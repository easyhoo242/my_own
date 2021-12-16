// 布尔值
var done = false;
// 数字
var countInt = 123;
var countFloat = 12.3;
var countDouble = 12.12312319827398;
// 数组
var arrNum = [1, 2, 3];
var arrNumC = [1, 2, 3];
console.log(arrNum);
var arrStr = ['1', '2', '3'];
var arrStrC = ['1', '2', '3'];
console.log(arrStr);
var x;
x = ['123', 123];
// x = [123, '123']   //error
var AMan = /** @class */ (function () {
    function AMan(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = this.firstName + ' ' + this.middleInitial + ' ' + this.lastName;
    }
    return AMan;
}());
var person = {
    name: 'dc',
    age: 33
};
var whatTheManSay = "well , i am " + person.name + ", \n                      i'm going to " + person.age + " next month";
