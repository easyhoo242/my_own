import './js/element'

import { sum } from './js/math'

console.log(sum(20, 30))

const name = [...'123123'].map(res => parseInt(res))

name.forEach((item, index) => {
  console.log(`{这是第${index}项: ${item}}`)
})
