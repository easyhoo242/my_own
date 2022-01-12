<template>
  <div>
    <h2>父传子</h2>
    <p>数组用法 start</p>
    <ShowMessage class="sm1" id="sm1" msg="123" content="456"></ShowMessage>
    <ShowMessage :msg="msg" :content="content"></ShowMessage>
    <ShowMessage :msg="message.msg" :content="message.content"></ShowMessage>
    <h3>单标签 且 'v-bind='</h3>
    <showMessage v-bind="message" />
    <p>数组用法 end</p>
  </div>
</template>

<script>
import ShowMessage from './showMessage.vue'

export default {
  components: {
    ShowMessage,
  },

  setup() {
    return {
      msg: '我是msg',
      content: '我是content',
      message: {
        msg: '我是message(obj)',
        content: '我是content(obj)',
      },
    }
  },
}
</script>

<style></style>
