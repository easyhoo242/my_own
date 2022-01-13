<template>
  <div class="container">
    <h2>components-ShowMsg</h2>
    <input type="text" v-model="msg" />
    <br />
    <button @click="postMsg">点击发送msg</button>
    <br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '这是showMsg的默认msg',
    }
  },
  emit: ['sendMsg'],
  methods: {
    postMsg() {
      this.$emit('sendMsg', this.msg)
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 500px;
  border: 2px solid #ff8200;

  input {
    width: 300px;
    text-align: center;
  }
}
</style>
