// 没搞懂
// 不知道有啥用
interface IFly {
  flying: () => void
}

interface IRunning {
  running: () => void
}

interface IWalking extends IFly, IRunning { }

const action: IWalking = {
  flying() {

  },
  running() {

  }
}

export { } 