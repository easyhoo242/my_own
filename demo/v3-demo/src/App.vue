<template>
  <div>
    <button @click="isShowDemo = !isShowDemo">显示/隐藏Demo</button>
    <br />
    <br />
    <Demo v-if="isShowDemo" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Demo from './components/Demo3_toRef.vue'

export default defineComponent({
  name: 'App',
  components: {
    Demo
  },
  setup() {
    const isShowDemo = ref(false)

    return {
      isShowDemo
    }
  }
})
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
