<template>
  <div class="container">
    <Login />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import Home from './views/home/index.vue'
import Login from './views/login/index.vue'

export default defineComponent({
  name: 'app',
  components: {
    Login,
  },
})
</script>

<style lang="scss">
html {
  background-color: rgb(252, 252, 252);
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
