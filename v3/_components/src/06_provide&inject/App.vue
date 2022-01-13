<template>
  <div class="app-container">
    <h2>单向数据流 不要让子组件改父组件的内容</h2>
    这是App
    <Home @addName="addName" />
  </div>
</template>

<script>
import Home from './Home.vue'
import { computed } from 'vue'

export default {
  components: {
    Home,
  },
  data() {
    return {
      name: ['dc', 'cd', 'dcx'],
    }
  },
  methods: {
    addName() {
      console.log(this.name)
      this.name.push('dcx')
    },
  },
  provide() {
    return {
      name: 'dc',
      age: 18,
      length: computed(() => this.name.length),
    }
  },
}
</script>

<style lang="scss" scoped>
div {
  border: 1px solid #ff8200;
  padding: 5px;

  &.app-container {
    width: 400px;
    margin: 0 auto;
  }
}
</style>
