<template>
  <div>
    <button @click="decrement">-</button>
    <button @click="increment">+</button>
    <input type="text" v-model.number="num" />
    <button @click="incrementN">+N</button><br />
    <button @click="isShowDiv">点击控制显示隐藏div</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0,
      flag: false,
    }
  },
  // emit: ['add', 'sub', 'addN'],
  // 对象写法就是为了进行参数的验证
  // 否则一般情况下都会使用数组写法
  emit: {
    add: true,
    sub: null,
    addN: (num) => {
      if (num > 20) return true
      return false
    },
    isShow: null,
  },
  methods: {
    increment() {
      console.log('+')
      this.$emit('add')
    },
    decrement() {
      console.log('-')
      this.$emit('sub')
    },
    incrementN() {
      this.$emit('addN', this.num, 'dc', 18)
    },
    isShowDiv() {
      this.flag = !this.flag
      this.$emit('isShow', this.flag)
    },
  },
}
</script>
