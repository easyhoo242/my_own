<template>
  <div>
    这是Home <br />
    接收到app的 ： {{ `name : ${name}   age: ${age}  length: ${length.value}` }}
    <HomeContent />
    <button @click="addName">+name</button>
  </div>
</template>

<script>
import HomeContent from './HomeContnet.vue'

export default {
  components: {
    HomeContent,
  },
  inject: ['name', 'age', 'length'],
  emit: ['addName'],
  methods: {
    addName() {
      this.$emit('addName')
    },
  },
}
</script>

<style lang="scss" scoped></style>
