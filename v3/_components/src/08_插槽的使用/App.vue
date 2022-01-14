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
      没有name的slot 会有一个隐含的名字 default
      <name-slot :name="name">
        <template v-slot:left>左边</template>
        <template #center>中间</template>
        <template #right>右边</template>
        <template #[name]>这是动态具名插槽</template>
      </name-slot>
    </div>
    <div class="right">
      <scope-slot :name="nameList">
        
      </scope-slot>
    </div>
  </div>
</template>

<script>
import noNameSlot from './noName.vue'
import nameSlot from './nameSlot.vue'
import scopeSlot from './scopeSlot.vue'

export default {
  components: {
    noNameSlot,
    nameSlot,
    scopeSlot,
  },
  data() {
    return {
      name: 'dcc',
      nameList: ['dc', 'cd', 'dcc', 'cdd'],
    }
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
