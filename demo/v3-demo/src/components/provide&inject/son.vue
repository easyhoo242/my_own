<template>
  <div class="son">
    这是son <br />
    车名：{{ car.name }} 价格：{{ car.price }}
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'son',
  setup() {
    const car = inject('car')
    return {
      car
    }
  }
}
</script>

<style scoped>
.son {
  font-size: 12px;
  height: 50px;
  width: 70px;
  background-color: skyblue;
}
</style>
