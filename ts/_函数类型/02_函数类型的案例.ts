const calc = (n1: number, n2: number, fn: (n1: number, n2: number) => number) => {
  return fn(n1, n2)
}

const res1 = calc(20, 30, (n1, n2) => n1 + n2)

const res2 = calc(20, 30, (n1, n2) => n1 * n2)

console.log(res1, res2)
