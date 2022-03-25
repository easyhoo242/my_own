
// var test1 = function test() {
//   var a = 1
//   var b = 2
//   // 函数内部可以调用字面量函数本身 (递归)
//   // test()
//   console.log(a, b)
// }


// // console.log(test1.name)   //test
// test1()
// // 在外部不能访问到函数字面量函数名
// test()




// function test(a, b) {
//   console.log(test.length)  //形参的长度
//   console.log(arguments.length)  //实参的长度
// }

// test('x', 'y', 'z')


// function test(a, b) {
//   a = 3
//   console.log(arguments[0]) // 3
//   // 函数内部可以修改实参的值
// }

// test(1)


// function test(a, b) {
//   b = 3
//   console.log(arguments[1]) // undefined
//   // 
// }

// test(1)



// eg：
// 一元钱可以买一瓶水，两个空瓶可以换一瓶水，

// 三个瓶盖可以换一瓶水，20块钱可以换多少瓶水

// 借鉴思路；1元   1瓶      
//			2元  5瓶  		
//			3元  11瓶		
//			4元  17瓶		
//			5元   23瓶	

function getWater(n) {
  if (n === 1) {
    return 1
  }
  if (n === 2) {
    return 5
  }
  return getWater(n - 1) + 6
}

console.log(getWater(20))