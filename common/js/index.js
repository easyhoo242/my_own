export const myMap = (a, ...args) => a.map(...args)
export const myReduce = (a, ...args) => a.reduce(...args)
export const sum = (x, y) => x + y
export const square = (x, y) => x * x

export const _splitLine = (res = '-') => {
  res ? logR(res) : logR('-')
}
export const logR = res => console.log(new Array(30).join(res))

export function debounce(time, fn) {
  let timer
  let isLock = false

  return function (...args) {
    if (!isLock) {
      fn(...args)
      isLock = true
    }

    clearTimeout(timer)
    timer = setTimeout(() => {
      isLock = false
    }, time)
  }
}