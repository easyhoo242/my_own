; (function () {
  const isHaveSp = (w) => {
    const sp = [1, 2, 0, 9].map(res => res.toString())
    let flag = false
    sp.forEach(item => {
      if (w.toString().split('').includes(item)) {
        flag = true
        return
      }
    })
    return flag
  }

  let sum = 0
  for (let i = 1; i < 11; i++) {
    isHaveSp(i) && (sum += Math.pow(i, 2))
  }
  console.log(sum)
})()