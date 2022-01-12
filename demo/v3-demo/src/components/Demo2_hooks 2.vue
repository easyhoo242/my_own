<template>
  <div>你点击位置的坐标是: {{ point }}</div>
</template>

<script>
import { ref } from 'vue'
import getPoint from '../hooks/getPoint'

export default {
  name: 'demo2',
  setup() {
    const num = ref(0)
    // 使用hooks
    const point = getPoint()
    return {
      num,
      point
    }
  }
}
</script>
