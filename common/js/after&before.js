// 改进前 问题是每次点击都会显示nodes的长度 即不管点的是极好node 结果都是遍历到最后一个
const addTheHandlers = () => {
  for (var i = 0; i < Nodes.length; i++) {
    nodes[i].onclick = function (e) {
      console.log(i)
    }
  }
}

// 改进后 点击那个node 就打印哪个编号node
const addTheHandlersC = () => {
  var helper = i => {
    return e => console.log(e)
  }

  for (var i = 0; i < nodes.length; i++) {
    nodes[i].click = helper(i)
  }
}

// es6后 使用let可以直接解决该问题
// 块级作用域
export {
  addTheHandlers,
  addTheHandlersC
}