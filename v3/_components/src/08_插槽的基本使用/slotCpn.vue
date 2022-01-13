<template>
  <div class="container">
    <h2>插槽 start</h2>
    <slot />
    <h2>插槽 end</h2>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.container {
  border: 2px solid #ff8200;
  padding: 5px;
}
</style>
