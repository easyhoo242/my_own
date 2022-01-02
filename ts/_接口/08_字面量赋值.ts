interface IInfo {
  name: string
  age: number
  height: number | string
}

const printInfo = (person: IInfo) => {
  console.log(person)
}

const person = {
  name: 'dc',
  age: 18,
  height: 1.88,
  address: 'BeiJing'
}

// 这样的话 由于有严格的类型限制 该类型外的参数都不能传进来 
printInfo({
  name: 'dc',
  age: 18,
  height: 1.88,
  // 不存在address的属性
  // address: 'BeiJing'
})


// 但是这样就可以将整个对象赋值给printInfo 包括类型外的属性
// 目的就是为了多传参 
// 擦出操作  将类型外的属性擦除
printInfo(person)

