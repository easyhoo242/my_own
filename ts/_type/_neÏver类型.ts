// function foo(): never {
//   while (true) {

//   }
// }

// function bar(): never {
//   throw new Error()
// }


// 这个例子中如果食用了除string number之外的类型时
// 使用never类型可以让开发者进入到default 然后提醒报错
// 在case中完善类型
// function handleMessage(message: string | number | boolean) {
function handleMessage(message: string | number) {
  switch (typeof message) {
    case 'string':
      console.log('string方式处理' + message)
      break
    case 'number':
      console.log('number方式处理' + message)
      break
    // case 'boolean':
    //   console.log('boolean方式处理' + message)
    //   break
    default:
      const check: never = message
  }
}

handleMessage(123)

handleMessage('abc')