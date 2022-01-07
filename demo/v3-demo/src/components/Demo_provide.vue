<template>
  <div class="provide">
    祖先组件： <br />
    车名：{{ name }} 价格：{{ price }}
    <Father />
  </div>
</template>

<script>
import Father from './provide&inject/father.vue'
import { reactive, provide, toRefs } from 'vue'

export default {
  name: 'provide',
  components: {
    Father
  },
  setup() {
    const car = reactive({
      name: '大奔',
      price: 16.8
    })

    provide('car', car)

    return {
      ...toRefs(car)
    }
  }
}
</script>

<style scoped>
.provide {
  margin: 0 auto;
  width: 150px;
  height: 150px;
  text-align: center;
  background-color: #ff8200;
}
</style>
