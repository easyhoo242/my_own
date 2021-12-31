const name: string[] = ['dc', 'cd', 'adc']


// 一般情况下可以不加类型
// 对于这个实例来说 res的值来自于name
// name是一个string类型的数组，里面的每一项均为数组
// 所以res也为数组
// 但是为了严谨也可以加上

// eg： 加不加都行
name.map((res: string) => {
  console.log(res.split(''))
})

export { }