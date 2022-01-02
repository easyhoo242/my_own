// // hook useState

// function useState(state: any) {
//   let currentState = state

//   // 改变了currentState
//   const changeState = (newState: any) => {
//     currentState = newState
//   }

//   // 返回两个新定义的变量和函数
//   // tuple是元组类型
//   const tuple: [any, (newState: any) => void] = [currentState, changeState]

//   return tuple
// }

// // counter为any类型（实际想想要的是number类型）
// // setCounter为函数类型
// const [counter, setCounter] = useState(10)

// // 这里的title同为any类型， 实际想要的是string类型
// const [title, setTitle] = useState('abc')


// export { }
// type StateType = string | number

// const useState = (state: StateType) => {
//   let currentState = state

//   const changeState = (newState: StateType) => {
//     currentState = newState
//   }

//   const tupleArr: [StateType, (val: StateType) => void] = [currentState, changeState]

//   return tupleArr
// }

// 优化 使用泛型

const useState = <T>(state: T) => {
  let currentState = state

  const changeState = (newState: T) => {
    currentState = newState
  }

  const tupleArr: [T, (val: T) => void] = [currentState, changeState]

  return tupleArr
}

useState(true)
useState




