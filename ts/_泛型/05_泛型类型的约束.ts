interface ILength {
  length: number
}

const getLength = <T extends ILength>(args: T) => {
  // 直接写不一定存在length属性 
  // 所以要进行继承 约束泛型的类型
  console.log(args.length)
}


getLength('abc')
getLength([1, 2, 3])
getLength({ length: 20 })