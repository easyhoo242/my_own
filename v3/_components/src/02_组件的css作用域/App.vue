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
h2 {
  color: red;
}
</style>
