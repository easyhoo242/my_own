<template>
  <div>
    {{ name }}
    <div v-for="(item, index) in name" :key="index">
      <slot :item="item" :index="index"> </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
