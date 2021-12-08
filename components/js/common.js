export const map = (a, ...args) => a.map(...args)
export const reduce = (a, ...args) => a.reduce(...args)
export const sum = (x, y) => x + y
export const square = (x, y) => x * x

export const _splitLine = (res = '-') => {
  res ? logR(res) : logR('-')
}

export const logR = res => console.log(new Array(30).join(res))
