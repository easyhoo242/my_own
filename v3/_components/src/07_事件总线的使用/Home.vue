<template>
  <div>
    这是Home <br />
    <button @click="btnClick">发送给info</button>
  </div>
</template>

<script>
import emitter from './utils/eventBus'

export default {
  methods: {
    btnClick() {
      emitter.emit('event1', {
        name: 'dc',
        age: 18,
      })
    },
  },
}
</script>
