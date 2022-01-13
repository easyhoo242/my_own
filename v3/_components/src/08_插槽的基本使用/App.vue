<template>
  <div>
    <slot-cpn> 123 </slot-cpn>
    <slot-cpn>
      <button>click</button>
    </slot-cpn>

    <slot-cpn></slot-cpn>
  </div>
</template>

<script>
import SlotCpn from './slotCpn.vue'

export default {
  components: {
    SlotCpn,
  },
}
</script>

<style lang="scss" scoped></style>
