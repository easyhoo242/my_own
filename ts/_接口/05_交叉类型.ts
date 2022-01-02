interface IFly {
  flying: () => void
}

interface IRunning {
  running: () => void
}



// 组合接口
// 组合接口意味着必须同时满足两个接口所需要的类型
// 可以使用继承的方式
interface IAction extends IFly, IRunning {
}

// 也可以使用交叉类型
type IUType = IFly & IRunning


// 以下两个对象证明了继承和交叉类型均可组合接口
const flyingAndRunning: IAction = {
  flying() {

  },
  running() {

  }
}
const runningAndFlying: IUType = {
  flying() {

  },
  running() {

  }
}
