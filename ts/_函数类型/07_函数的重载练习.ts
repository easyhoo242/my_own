// 一般情况下 如果联合类型能够实现就使用联合类型
// 对于这个例子 string和[] 都有length属性 所以使用联合类型更好一些 

// 联合类型实现
function getLength(args: string | string[]): number {
  return args.length
}

getLength('123')
getLength(['123', '456', '789'])


// 重载实现
function getLengthC(args: string): number;
function getLengthC(args: string[]): number;

function getLengthC(args: any): number {
  return arguments.length
}

getLengthC('123')
getLengthC(['123', '456', '789'])