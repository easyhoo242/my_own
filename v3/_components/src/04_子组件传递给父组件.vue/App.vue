<template>
  <div class="header">
    <div class="title">头部标题</div>
    <h1>{{ count }}</h1>
    <CounterOperation
      @add="addOne"
      @sub="subOne"
      @addN="addNum"
      @isShow="isShowDiv"
    />
    <div v-show="flag" class="is-show-div">
      <span>1</span>
    </div>
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
    addNum(num, name, age) {
      this.count += num
      console.log('姓名' + name, '年龄' + age)
    },
    isShowDiv(flag) {
      this.flag = flag
    },
  },
  setup() {
    const count = ref(0)
    const flag = ref(false)
    return {
      count,
      flag,
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
.is-show-div {
  width: 200px;
  height: 200px;
  background-color: #ff8200;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    color: yellowgreen;
  }
}
</style>
