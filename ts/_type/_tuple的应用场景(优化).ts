// hook useState

function useState<T>(state: T): [T, (newValue: T) => void] {
  let currentState = state

  // 改变了currentState
  const changeState = (newState: T) => {
    currentState = newState
  }

  // 返回两个新定义的变量和函数
  // tuple是元组类型
  const tuple: [T, (newState: T) => void] = [currentState, changeState]

  return tuple
}

// 使用范型后会将传入的参数类型传递给其他使用到该参数的变量
// 比any严谨的多

// setCounter为函数类型

// 此处的counter为number类型
const [counter, setCounter] = useState(10)
// 此处的title为string类型
const [title, setTitle] = useState('abc')
// 此处的flag为boolean类型
const [flag, setFlag] = useState(true)


// 普通写法
const foo = () => { }
// 给类型
const fooC: () => void = () => { }

// 给类型简写 
// 常用
type myFunc = () => void
const bar: myFunc = () => { }

export { }