function printId(id: number | string | boolean) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase)
  } else {
    console.log(id)
  }
}


printId(123)
printId('abc')
printId('true')