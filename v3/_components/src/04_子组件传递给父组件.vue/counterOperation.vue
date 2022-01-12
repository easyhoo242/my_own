<template>
  <div>
    <button @click="decrement">-</button>
    <button @click="increment">+</button>
    <input type="text" v-model.number="num" />
    <button @click="incrementN">+N</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0,
    }
  },
  emit: ['add', 'sub', 'addN'],
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
  },
}
</script>

<style scoped></style>
