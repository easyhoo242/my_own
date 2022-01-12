<template>
  <div>
    App
    <h2>test</h2>
    <Header />
    <Footer />
  </div>
</template>

<script>
import Header from './header.vue'
import Footer from './footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
}
</script>

<style scoped>
/* vue3中样式会遗传到子组件 应该是一个bug */
/* 但是一般开发中都会使用class类名  所以这种问题可以避免*/
h2 {
  color: red;
}
</style>
