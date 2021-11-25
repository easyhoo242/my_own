const map = (a, ...args) => a.map(...args)
const reduce = (a, ...args) => a.reduce(...args)
const sum = (x, y) => x + y
const square = (x, y) => x * x

const _splitLine = (res = '-') => {
  res ? logR(res) : logR('-')
}

const logR = res => console.log(new Array(30).join(res))

export {
  map,
  reduce,
  sum,
  square,
  _splitLine,
  logR
}