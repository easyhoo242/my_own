// var a = function sunSched() {
//   var sunSched = ''
//   var operatin = {
//     setSched: function (thing) {
//       sunSched = thing
//     },
//     showSched: function () {
//       console.log('My schedule on sunday is' + ' ' + sunSched)
//     },
//   }
//   return operatin
// }
// sunSched.setSched('walk')
// sunSched.showSched()
// ;(function () {})()

// function add(n) {
//   return (n = n + 1)
// }

let arr = [1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6]
// 1. 新 arr

const getFinalArr = (arr) => {
  const arrC = arr.filter((item) => item !== 0)

  for (let i = 0, len = arr.length - arrC.length; i < len; i++) {
    arrC.push(0)
  }
  return arrC
}

const getFinalArr1 = (arr) => {
  const arrC = []
  const len = arr.length
  for (let i = 0; i < len; i++) {
    i !== 0 && arrC.push(arr[i])
  }
}

// 2. no 新arr

const getFinalArrC = (arr) => {
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i] === 0) {
      arr.splice(i, 1)
      arr.push(0)
    }
  }

  return arr
}

const getFinalArrCC = (arr) => {
  for (let i = 0, len = arr.length; i < len; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i] === 0) {
        if (arr[j] !== 0) {
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
        }
      }
    }
  }

  return arr
}

console.log(getFinalArrCC(arr))
