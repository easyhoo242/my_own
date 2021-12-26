class Tab {
  constructor(id) {
    this.tab = document.querySelector(id)

    this.addBtn = this.tab.querySelector('.btn')
    this.ul = this.tab.querySelector('ul')
    this.content = this.tab.querySelector('section')
    // 初始化
    this.init()

    this.uid = this.lis.length
  }

  // 初始化
  init() {
    this.upDataList()
    // 选项增加按钮
    this.addBtn.addEventListener('click', () => {
      this.addTab()
    })
    // 点击事件初始化
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i
      this.lis[i].addEventListener('click', () => {
        this.toggleTab(i)
      })
      this.delBtn[i].addEventListener('click', () => {
        this.deleteTab(i)
      })
    }
  }
  // 更新list
  upDataList() {
    this.lis = this.tab.querySelectorAll('li')
    this.secs = this.tab.querySelectorAll('.item')
    this.delBtn = this.tab.querySelectorAll('i')
  }

  // 清除样式
  clearClass() {
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].className = ''
      this.secs[i].className = 'item'
    }
  }
  // 切换选项卡
  toggleTab(index) {
    this.clearClass()
    this.lis[index].className = 'active'
    this.secs[index].className = 'item active'
    console.log(index, 'toggle')
  }
  // 增加选项卡
  addTab() {
    const id = ++this.uid
    // 创建tab和内容
    const newLi = `<li><span>选项${id}</span><i>x</i></li>`
    const newSec = `
      <div class="item">
      标题${id}<br>
      内容${id}
      </div>
    `
    // 将tab和内容加入到队列末
    this.ul.insertAdjacentHTML('beforeend', newLi)
    this.content.insertAdjacentHTML('beforeend', newSec)

    // 同步更新
    this.init()
    this.lis[this.lis.length - 1].click()
  }
  // 删除选项卡
  deleteTab(index) {

    // let index = this.parentNode.index
    console.log(index, 'delete')

    this.lis[index].remove()
    this.secs[index].remove()



    this.lis[index - 2].click()
    this.secs[index - 2].click()

    this.init()
  }
  // 修改文案
  editTab() {

  }
}

const tab = new Tab('.tab')
