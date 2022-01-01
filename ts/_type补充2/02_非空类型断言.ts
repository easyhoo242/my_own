// 非空类型断言
// 表示一定有值

function printMessageLength(msg?: string) {
  // 第一种方式是判断类型
  // if (typeof msg === 'string') {
  //   console.log(msg.length)
  // }

  // 第二种方式是非空类型断言
  // 注意这里的叹号
  console.log(msg!.length)
}


printMessageLength('aaa')
printMessageLength('hello world')

printMessageLength()