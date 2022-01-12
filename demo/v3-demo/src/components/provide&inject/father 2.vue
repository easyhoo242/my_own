<template>
  <div class="father">
    这是father <br />
    车名：{{ name }} 价格：{{ price }}
    <Son />
  </div>
</template>

<script>
import Son from './son.vue'
import { inject, toRefs } from 'vue'

export default {
  name: 'father',
  components: {
    Son
  },
  setup() {
    const car = inject('car')
    return {
      ...toRefs(car)
    }
  }
}
</script>
<style scoped>
.father {
  width: 100px;
  height: 100px;
  background-color: hotpink;
}
</style>
