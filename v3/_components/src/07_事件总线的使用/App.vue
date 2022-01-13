<template>
  <div class="app-container">
    这是App
    <Home />
    <Info />
  </div>
</template>

<script>
import Home from './Home.vue'
import Info from './Info.vue'

export default {
  components: {
    Home,
    Info,
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
div {
  border: 1px solid #ff8200;
  padding: 5px;

  &.app-container {
    width: 400px;
    margin: 0 auto;
  }
}
</style>
