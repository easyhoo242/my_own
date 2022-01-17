<template>
  <div class="container">
    <Home />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Home from './Home/index.vue'

export default defineComponent({
  name: 'app',
  components: {
    Home,
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
