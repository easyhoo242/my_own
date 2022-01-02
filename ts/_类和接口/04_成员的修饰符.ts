// 修饰符
// public 所有人都可以访问  默认值
// private 只有在当前class中可以访问到
// protected 只有在当前类和子类中可以访问到

class Father {
  protected name: string

  constructor(name: string) {
    this.name = name
  }

  getName() {
    return this.name
  }

  setName(newName: string) {
    this.name = newName
  }
}

class Son extends Father {
  constructor(name: string) {
    super(name)
  }

  printName() {
    console.log(this.name)
  }
}

const p = new Son('dc')

// 无法使用
// p.name

export { }