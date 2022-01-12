<template>
  <div class="content">
    <div
      v-for="(item, index) in tabList"
      :key="item"
      class="item"
      @click="getCurrentClick(index)"
      :class="{ active: currentIndex === index }"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabList: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  emit: ['getIndex'],
  methods: {
    getCurrentClick(index) {
      console.log(index)
      this.currentIndex = index
      this.$emit('getIndex', index)
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  border: 2px solid #000;
  border-radius: 15px;
  padding: 15px 20px;
  width: 350px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
}

.active {
  color: #ff8200;
}
</style>
