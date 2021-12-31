// 对象类型的别名
type personType = {
  name: string,
  age: number,
  // 可选类型
  smoke?: boolean
}
// 联合类型别名
type idType = string | number | boolean
// 函数返回值别名
type nameType = string | number
type funcType = (val: nameType) => void

// 对象类型验证
const printPerson = (person: personType) => {
  console.log(person)
}
const dc = {
  name: 'dc',
  age: 18,
  smoke: true
}
printPerson(dc)

// 联合类型验证
const printId = (id: idType) => {
  console.log(id)
}
printId('abc')
printId(123)
printId(false)

// 函数返回值类型验证
const printName: funcType = (name: nameType) => {
  console.log(name)
  return name
}
printName('dc')

export { }