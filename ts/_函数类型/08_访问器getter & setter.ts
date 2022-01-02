class Person {
  private _name: string
  constructor(name: string) {
    this._name = name
  }


  // 访问器 getter/setter
  set name(newName: string) {
    this._name = newName
  }

  get name() {
    return this._name
  }
}

const p = new Person('dc')


// private 拿不到这个属性
// console.log(p._name)
// p._name = 'cd'


console.log(p.name)
p.name = 'cd'


export {

}