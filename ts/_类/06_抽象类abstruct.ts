function makeArea(shape: Shape) {
  return shape.getArea()
}

// 抽象类可以避免被实例化
abstract class Shape {
  // 抽象函数必须被放在抽象类中
  // 抽象方法可以不用实现
  abstract getArea(): number
}

class Rectangle extends Shape {
  private height: number
  private width: number

  constructor(width: number, height: number) {
    // 派生类的构造函数必须包含super调用
    super()
    this.width = width
    this.height = height
  }

  getArea(): number {
    return this.height * this.width
  }
}

class Circle extends Shape {
  private r: number
  private PI: number = 3.14

  constructor(r: number) {
    super()
    this.r = r
  }

  getArea(): number {
    return this.r * this.r * this.PI
  }
}


makeArea(new Circle(23))
makeArea(new Rectangle(20, 30))

// 无法创建抽象类的实例
// makeArea(new Shape())


export { }