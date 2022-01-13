<template>
  <div class="container">
    <div class="left">
      <h2>基本使用</h2>
      内有元素
      <no-name-slot>
        <button>click</button>
      </no-name-slot>
      内无元素
      <no-name-slot> </no-name-slot>

      内有多个元素
      <!-- 当一个插槽对应多个元素时，会被当作一个虚拟元素放到插槽中 -->
      <!-- 同时如果该组件中有多个插槽， 并且有多个元素的情况下  有几个插槽就会出现几组多个元素的情况 -->
      <!-- 例如 3个元素 组件中有3个插槽 最终会渲染出9个元素来 重复三组 -->
      <no-name-slot>
        <button>click</button>
        <h2>case</h2>
        <button>click</button>
      </no-name-slot>
    </div>
    <div class="main">
      <h2>具名插槽</h2>
      <name-slot></name-slot>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
import noNameSlot from './noName.vue'
import nameSlot from './nameSlot.vue'

export default {
  components: {
    noNameSlot,
    nameSlot,
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;

  .left {
    width: 30%;
    flex: 0 0 auto;
  }

  .main {
    width: 30%;
    flex: 0 0 auto;
  }

  .right {
    width: 30%;
    flex: 0 0 auto;
  }
}
</style>
