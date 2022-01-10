// 导入scss
import '../css/index.css'
// import '../css/font.scss'

// 图片如果直接使用会出错 必须采用导入的方式
const baiduPng = require('../img/baidu.png')

const divEl = document.createElement('div')
divEl.className = 'container'
divEl.innerHTML = '你好啊,猪儿熊!'

const bgDivEl = document.createElement('div')
bgDivEl.className = 'img-bg'
bgDivEl.innerHTML = '背景图 '


const imgEl = document.createElement('img')
imgEl.className = 'img'
imgEl.src = baiduPng

const body = document.body
body.appendChild(divEl)
body.appendChild(bgDivEl)
body.appendChild(imgEl)
export default {}
