// var id = '123'
//   ; (function () {
//     if (typeof id === 'undefined') {
//       var id = '456'
//       console.log(`a${id}`)
//     } else console.log(`b${id}`)
//   })()

let uname = 'World'
  ; (function () {
    console.log(uname)
    if (uname) {
      console.log('hello ' + uname)
    } else {
      let uname = 'jack'
      console.log('你好: ' + uname)
    }
  })()


// var a = 1
//   ; (function () {
//     console.log(a)
//   })()