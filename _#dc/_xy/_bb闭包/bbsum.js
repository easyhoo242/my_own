// 实现sum方法 sum(x, y)  sum(x)(y)返回的结果相同

// 函数柯里化
function sum(x, y) {
  if (y) {
    return x + y
  }

  return function (y) {
    return x + y
  }
}



// var sum = function (x) { if (arguments[1]) { return x + arguments[1]; } else { return function (y) { return x + y; }; } }; console.log(sum(1)(2)); //3 console.log(sum(1, 2));