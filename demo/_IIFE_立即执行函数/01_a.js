var a = 1
  ; (function () {
    var a = 2
    console.log(this)
    console.log(a)
  })()

console.log('---------------')

  ; (function () {
    console.log(this)
    console.log(a)
  })()


console.log('---------------')

  ; (function a() {
    // var a = 3
    console.log(this)
    console.log(a)
  })()