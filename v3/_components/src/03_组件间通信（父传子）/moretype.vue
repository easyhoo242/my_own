<template></template>

<script>
export default {
  props: {
    messageInfo: String,
    // 基础类型检查
    propA: String,
    // 多种类型检查 （元组）
    propB: [String, Number],
    // 是否为必填
    propC: {
      type: String,
      required: true,
    },
    // 默认值
    propD: {
      type: Number,
      default: '100',
    },
    propE: {
      type: Object,
      // 重要
      // 对象或者数组必须返回一个工厂函数获取
      // 这是因为对象和数组都是引用类型 当创建多个实例的时候 如果使用的是一个对象 则所有的子组件指向的都是同一个是对象 当一个发生了改变时 其他的也都会跟随着改变
      // 使用函数则会避免这个问题
      default() {
        return {
          message: 'hello',
        }
      },
    },
    // 自定义验证函数
    propF: {
      isHaveVal(val) {
        // 如果val不匹配下数组其中之一的话 将返回false
        return ['succeed', 'error', 'danger'].includes(val)
      },
    },
    // 具有默认值的函数
    propG: {
      type: Function,
      default() {
        // 这里返回的应该是一个字符串
        // 而不应该夹杂其他的东西
        // 否则会报错
        return '函数的默认值'
      },
    },
  },
}
</script>
