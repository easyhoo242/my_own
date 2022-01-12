<template>
  <div>
    <button @click="decrement">-</button>
    <button @click="increment">+</button>
  </div>
</template>

<script>
export default {
  emit: ['add', 'sub'],
  methods: {
    increment() {
      console.log('+')
      this.$emit('add')
    },
    decrement() {
      console.log('-')
      this.$emit('sub')
    },
  },
}
</script>

<style scoped></style>
