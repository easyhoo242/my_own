// 以下两者的效果是一样的

function printId(id?: string) {
  console.log(id)
}

printId()

function printName(name: string | undefined) {
  console.log(name)
}

// 如果不想给值
// 这里必须传入undefined
printName(undefined)

export { }