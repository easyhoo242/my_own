type TypeThis = { name: string }

function eating(this: TypeThis) {
  console.log(this.name + ' eating')
}

const info = {
  name: 'dc',
  eating
}

info.eating()


eating.call('dc')
eating.apply('cd')

export { }