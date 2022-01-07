<template>
  <div>{{ num }} <button @click="num++">++</button></div>
</template>

<script>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  ref
} from 'vue'

export default {
  name: 'HelloWorld',
  setup() {
    console.log('---setup---')
    const name = ref('dc')
    const num = ref(0)


    // setup最先
    // 组合式api中的生命周期的优先级比options中的高

    onBeforeMount(() => console.log('---onBeforeMount---'))
    onMounted(() => console.log('---onMounted---'))
    onBeforeUpdate(() => console.log('---onBeforeUpdate---'))
    onUpdated(() => console.log('---onUpdated---'))
    onBeforeUnmount(() => console.log('---onBeforeUnmount---'))
    onUnmounted(() => console.log('---onUnmounted---'))

    return {
      name,
      num
    }
  },
  beforeCreated() {
    console.log('---beforeCreated---')
  },
  created() {
    console.log('---created---')
  },
  beforeMount() {
    console.log('---beforeMount---')
  },
  mounted() {
    console.log('---mounted---')
  },
  beforeUpdate() {
    console.log('---beforeUpdate---')
  },
  updated() {
    console.log('---updated---')
  }
}
</script>
