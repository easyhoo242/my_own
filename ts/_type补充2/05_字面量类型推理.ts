type Method = 'GET' | 'POST'

type Request = {
  url: string,
  method: Method
}
const postRequest = (url: string, method: Method) => { }

// 这种写法
// method会被推倒成string类型
// 所以需要进行一个限制
// const options = {
//   url: 'http://www.sjtc.org/dccd',
//   method: 'GET'
// }

// 解决办法一： 给options明确类型
// 推荐方法
const options: Request = {
  url: 'http://www.sjtc.org/dccd',
  method: 'GET'
}

// 解决办法二 ： 断言
// 缩小method 的范围
// const options = {
//   url: 'http://www.sjtc.org/dccd',
//   method: 'GET' as Method
// }

// 方法三： 将它本身作为一个类型
/*
相当于：一个只读的options类型
const options = {
  readonly url: 'http://www.sjtc.org/dccd',
  readonly method: 'GET'
}
*/
// const options = {
//   url: 'http://www.sjtc.org/dccd',
//   method: 'GET'
// } as const


postRequest(options.url, options.method)

export { }