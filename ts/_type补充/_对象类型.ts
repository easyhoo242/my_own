function printPoint(point: { x: number, y: number, z?: number }) {
  console.log(point.x)
  console.log(point.y)
}

const point = {
  x: 123,
  y: 321,
  z: 456
}
printPoint({ x: 123, y: 432 })
// 123 432 undefined
printPoint(point)
// 123 321 456 

export { }