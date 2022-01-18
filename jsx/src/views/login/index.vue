<template>
  <div>
    这是login
    <scopeSlot />
  </div>
</template>

<script>
import scopeSlot from '@/components/scopeSlot/index.tsx'

export default {
  components: {
    scopeSlot,
  },
}
</script>
