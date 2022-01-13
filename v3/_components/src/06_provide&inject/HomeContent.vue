<template>
  <div>
    这是HomeContent <br />
    接收到app的{{ `name: ${name}, age: ${age}` }}
  </div>
</template>

<script>
export default {
  inject: ['name', 'age'],
  setup() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
div {
  border: 1px solid #ff8200;
  padding: 5px;
}
</style>
