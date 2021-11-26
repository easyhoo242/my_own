const myMap = (a, ...args) => a.map(...args)
const myReduce = (a, ...args) => a.reduce(...args)
const sum = (x, y) => x + y
const square = (x, y) => x * x

const _splitLine = (res = '-') => {
  res ? logR(res) : logR('-')
}

const logR = res => console.log(new Array(30).join(res))

export {
  myMap,
  myReduce,
  sum,
  square,
  _splitLine,
  logR
}


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