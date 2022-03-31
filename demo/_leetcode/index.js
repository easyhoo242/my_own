const maxLenOfString = function (str) {
  let arr = []
  let max = 0
  for (let i = 0, len = str.length; i < len; i++) {
    console.log(arr)
    arr.includes(str[i]) && arr.splice(0, arr.indexOf(str[i]) + 1)
    arr.push(str[i])
    max = max > arr.length ? max : arr.length
  }
  return max
}

// console.log(maxLenOfString('abcabcbb'))
// console.log(maxLenOfString('bbbbb'))
console.log(maxLenOfString('pwwkew'))
