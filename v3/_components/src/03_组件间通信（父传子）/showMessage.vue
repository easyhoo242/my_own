<template>
  <div>
    <h3>message是 - {{ msg }}-</h3>
    <h3>content是 -{{ content }}-</h3>
  </div>
</template>

<script>
export default {
  // props: ['msg', 'content'],
  props: {
    // props 可以传值的类型
    // string
    // number
    // boolean
    // array
    // object
    // date
    // function
    // symbol
    msg: {
      type: String,
      default: 'msg默认值',
    },
    content: {
      type: String,
      default: 'content默认值',
    },
  },
}
</script>
