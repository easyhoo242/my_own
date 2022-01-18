<template>
  <div class="child-node">
    <slot name="header" :text="headerText"></slot>
    <slot :text="defaultText"></slot>
    <slot name="footer" :text="footerText"></slot>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
