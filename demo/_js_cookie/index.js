const logC = () => {
  console.log(new Array(20).fill(null).map(_ => '-').join(''))
}

const testA = [
  {
    a: 1,
    b: 2
  },
  {
    c: 3,
    d: 4
  },
  {
    e: 5,
    f: 6
  },
  {
    g: 7
  },
]
// function assign(target) {
//   for (var i = 1; i < arguments.length; i++) {
//     var source = arguments[i];
//     for (var key in source) {
//       target[key] = source[key];
//     }
//   }
//   return target
// }
// console.log(assign(testA))
// console.log(Array.isArray(assign(testA)))

const assignC = (...target) => {
  for (let i = 1; i < target.length; i++) {
    const source = target[i]
    for (const key in source) {
      target[key] = source[key]
    }
  }
  return target
}

// console.log(assignC(...testA))
// console.log(Array.isArray(assignC(testA)))

const defaultAttributes = [
  {
    h: 8,
    i: 9
  }
]

// if (globalThis === window) {
//   console.log('browser')
// } else if (globalThis === global) {
//   console.log('node')
// }

class Cookie {
  set(key, value, attributes) {
    // 判断是否在浏览器环境中
    // 如果想查看在哪个环境中，可以通过globalThis来查看
    // node: global
    // browser: window

    if (typeof document === 'undefined') {
      return
    }

    attributes = assignC({}, defaultAttributes, attributes)
    console.log(attributes)
  }
}

const cookie = new Cookie()
cookie.set(testA)