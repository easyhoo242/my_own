<template>
  <div class="container">
    <TabContent :tabList="tabList" @getIndex="checkContent" />

    {{ contentList[currentIndex] + '模块' }}

    <hr />

    <h3>接收ShowMsg传来的消息：</h3>
    <h3 class="getMsg">{{ msg || '这个是未发送时显示的默认消息' }}</h3>
    <ShowMsg @sendMsg="getMsg" />
  </div>
</template>

<script>
import TabContent from './tabContent.vue'
import ShowMsg from './ShowMsg.vue'

export default {
  components: {
    TabContent,
    ShowMsg,
  },
  data() {
    return {
      currentIndex: 0,
      tabList: ['电影', '音乐', '户外', '室内'],
      contentList: ['电影', '音乐', '户外', '室内'],
      msg: '',
    }
  },
  methods: {
    checkContent(index) {
      console.log(index)
      this.currentIndex = index
    },
    getMsg(msg) {
      this.msg = msg
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 100px auto 0;

  .getMsg {
    border: 1px solid #ff8200;
    border-radius: 15px;
    background-color: #ff8000bd;
    padding: 5px;

    color: #fff;
  }
}
</style>
