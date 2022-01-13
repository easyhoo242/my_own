<template>
  <div class="container">
    <h2>插槽 start</h2>
    <slot> 我是默认的元素 </slot>
    <h2>插槽 end</h2>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 300px;
  border: 2px solid #ff8200;
  padding: 5px;
}
</style>
