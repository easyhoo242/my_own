
function load_b() {
  undefined
  // 先把b.js调入

  var head = document.getElementsByTagName('head')
  var testScript = document.createElement('script')
  testScript.src = 'item.js'
  testScript.type = 'text/javascript'
  head[0].appendChild(testScript)
  // 现在就可以调用b.js中的test()函数了
  logR()
}
window.onload = load_b;

// document.write("<script language='javascript' src='./item.js'  type='module'></script>")
// import { a } from './item'



