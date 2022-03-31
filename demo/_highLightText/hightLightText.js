;(function () {
  const str = 'abcdefg-abcdefg'
  const hightLightTextC = (str, target) =>
    str.indexOf(target) !== -1
      ? str
          .split(target.trim())
          .join(`<span class="active">${target.trim()}</span>`)
      : ''

  console.log(hightLightTextC(str, 'a'))
  return
})()
