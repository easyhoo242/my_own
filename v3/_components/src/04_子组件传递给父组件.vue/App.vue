<template>
  <div class="header">
    <div class="title">头部标题</div>
    <h1>{{ count }}</h1>
    <CounterOperation @add="addOne" @sub="subOne" />
  </div>
</template>

<script>
import CounterOperation from './counterOperation.vue'
import { ref } from 'vue'

export default {
  components: {
    CounterOperation,
  },
  methods: {
    addOne() {
      this.count++
    },
    subOne() {
      this.count--
    },
  },
  setup() {
    const count = ref(0)
    return {
      count,
    }
  },
}
</script>

<style lang="scss" scoped>
.header {
  .title {
    color: #ff8200;
  }
}
</style>
