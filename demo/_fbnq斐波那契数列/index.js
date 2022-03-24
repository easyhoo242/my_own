// 斐波那契

// 从第二三位开始 每一位都是前两项的和
// 1  1  2  3  5  8  13  ...
let n1 = 1, n2 = 1, n3

const n = 4

for (let i = 1; i <= n; i++) {
  n3 = n1 + n2
  n1 = n2
  n2 = n3
}

// console.log(n3)


function fb(n) {
  if (n === 1 || n === 2) {
    return 1
  }

  let n1 = 1, n2 = 1, n3

  for (let i = 2; i < n; i++) {
    n3 = n1 + n2
    n1 = n2
    n2 = n3
  }

  return n3
}

console.log(fb(4))