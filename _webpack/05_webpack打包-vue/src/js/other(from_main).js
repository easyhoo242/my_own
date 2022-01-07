// import { createApp } from 'vue'
import { sum } from './math'
// const { priceFormat } = require('./format')

console.log(sum(20, 30))
// console.log(priceFormat(123))

const name = [...'123123'].map(res => parseInt(res))

name.forEach((item, index) => {
  console.log(`{这是第${index}项: ${item}}`)
})
