
let that
class Tab {
  constructor(id) {
    that = this

    this.tab = document.querySelector(id)

    this.addBtn = this.tab.querySelector('.btn')
    this.ul = this.tab.querySelector('ul')
    this.secs = this.tab.querySelector('section')
    this.init()
  }

  // 初始化
  init() {
    this.upDataList()
    // 增加选项按钮
    this.addBtn.onclick = this.addTab
    // 点击事件初始化
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i
      this.lis[i].onclick = this.toggleTab
    }
  }
  // 更新list
  upDataList() {
    this.lis = this.tab.querySelectorAll('li')
    this.secs = this.tab.querySelectorAll('.item')
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
  // 增加选项卡
  addTab() {
    // 创建tab和内容
    const newLi = `<li><span>新选项</span></li>`
    const newSec = `
      <div class="item">
      新标题<br>新内容
      </div>
    `
    // 将tab和内容加入到队列末
    that.ul.insertAdjacentHTML('beforeend', newLi)
    document.querySelector('.tab-content ').insertAdjacentHTML('beforeend', newSec)
    // 同步更新
    that.init()
  }
  deleteTab(e) {
    // 阻止冒泡事件
    e.stopPropagation()
    
  }
  editTab() {

  }
}

const tab = new Tab('.tab')
