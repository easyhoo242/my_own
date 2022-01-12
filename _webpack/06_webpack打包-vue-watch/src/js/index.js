// import { createApp } from 'vue'
import { sum } from './math'
import { priceFormat } from './format'
import './element'

console.log('---format 部分的内容 start---')
console.log(sum(20, 30))
console.log(priceFormat(123))

const name = [...'123123'].map(res => parseInt(res))

name.forEach((item, index) => {
  console.log(`{这是第${index}项: ${item}}`)
})


console.log('---format 部分的内容 end---')
