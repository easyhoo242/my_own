<template>
  <div>
    <h1>有一个人前来买瓜</h1>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
