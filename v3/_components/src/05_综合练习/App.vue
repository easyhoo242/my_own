<template>
  <div class="container">
    <TabContent :tabList="tabList" @getIndex="checkContent" />
    {{ contentList[currentIndex] + '模块' }}
  </div>
</template>

<script>
import TabContent from './tabContent.vue'

export default {
  components: {
    TabContent,
  },
  data() {
    return {
      currentIndex: 0,
      tabList: ['电影', '音乐', '户外', '室内'],
      contentList: ['电影', '音乐', '户外', '室内'],
    }
  },
  methods: {
    checkContent(index) {
      console.log(index)
      this.currentIndex = index
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
}
</style>
