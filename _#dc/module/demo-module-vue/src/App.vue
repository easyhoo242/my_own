<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <!-- <router-view /> -->
    <p ref="showData"></p>
  </div>
</template>


<script>
// import { getTopicsData } from '../api/index'
export default {
  name: 'App',
  data() {
    return {
      list: [],
    }
  },
  methods: {
    // getTopics() {
    //   return getTopicsData().then((res) => {
    //     console.log(res)
    //     this.list = res
    //   })
    // },
  },
  mounted() {
    this.$refs.showData.innerText = this.list
  },
}
</script>
<style lang="scss">
</style>
