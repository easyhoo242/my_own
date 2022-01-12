<template>
  <div v-bind="$attrs">
    <h3 :class="$attrs.class">message是 - {{ msg }}-</h3>
    <h3 :class="$attrs.id">content是 -{{ content }}-</h3>
  </div>
  <!-- 结果可以从f12中看到 通过$attrs修改过的class都变化了 相较于之前更加的灵活 -->
</template>

<script>
export default {
  // props: ['msg', 'content'],
  // 禁用继承class id
  // 使用可以通过 $attrs来给相应的element

  // 如果有多个根节点则必须制定要绑定哪个 否则会弹警告
  inheritAttrs: false,
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
