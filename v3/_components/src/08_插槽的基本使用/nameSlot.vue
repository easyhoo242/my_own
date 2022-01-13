<template>
  <div class="container">
    <section class="left">
      <slot name="left"></slot>
    </section>
    <section class="center">
      <slot name="center"></slot>
    </section>
    <section class="right">
      <slot name="right"></slot>
    </section>
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
  padding: 2px;
  display: flex;
  align-items: center;
  text-align: center;

  section {
    height: 50px;
    line-height: 50px;
  }

  .left,
  .right {
    flex: 0 0 auto;
    width: 20%;
    background-color: #ff8200;
  }
  .center {
    flex: 1 1 auto;
    background-color: skyblue;
  }
}
</style>
