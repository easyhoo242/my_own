<template>
  <div>
    这是about <br />
    {{ `姓名：${desc.name || '默认值'}  年龄：${desc.age || '10086'}` }}
  </div>
</template>

<script>
import emitter from './utils/eventBus'

export default {
  data() {
    return {
      desc: {},
    }
  },
  created() {
    emitter.on('event1', (info) => {
      console.log(info)
      this.desc = info
    })
  },
}
</script>

<style lang="scss" scoped></style>
