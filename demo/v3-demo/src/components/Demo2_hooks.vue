<template>
  <div>{{ num }} <button @click="num++">++</button></div>
</template>

<script>
import { ref } from 'vue'
import getPoint from '../hooks/getPoint'

export default {
  name: 'demo2',
  setup() { 
    const num = ref(0)
    getPoint()
    return {
      num
    }
  }
}
</script>
