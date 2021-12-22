
let that
class Tab {
  constructor(id) {
    that = this
    this.tab = document.querySelector(id)
    console.log(this)
    this.lis = this.tab.querySelectorAll('li')
    this.secs = this.tab.querySelectorAll('.item')
    this.init()
  }

  // 初始化
  init() {
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i
      this.lis[i].onclick = this.toggleTab
    }
  }

  // 清除样式
  clearClass() {
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].className = ''
      this.secs[i].className = 'item'
    }
  }
  // 切换选项卡
  toggleTab() {
    that.clearClass() 
    that.lis[this.index].className = 'active'
    that.secs[this.index].className = 'item active'
  }
  addTab() {

  }
  deleteTab() {

  }
  editTab() {

  }
}

const tab = new Tab('.tab')

console.log(tab)