const map = (a, ...args) => a.map(...args)
const reduce = (a, ...args) => a.reduce(...args)
const sum = (x, y) => x + y

const _splitLine = ( res => {
  return logR = res => {
    console.log(new Array(30).join(res))
  }
  res ? logR(res) : logR('-')
})()

const logR = () => console.log('test')





export {
  map,
  reduce,
  sum
}