function printPoint(point: { x: number, y: number }) {
  console.log(point.x)
  console.log(point.y)
}

const point = {
  x: 123,
  y: 321
}
printPoint({ x: 123, y: 432 })
printPoint(point)



export { }