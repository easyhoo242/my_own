<script lang="ts">
export { default } from './index.tsx'
</script>

<style lang="scss" scoped>
.company-table-wrap {
  .company-name-item {
    .company-name-logo {
      width: 40px;
      margin-right: 15px;
    }
  }

  .iconfont {
    font-size: 30px;
    color: $tip-color;

    &.icon-duibi {
      font-size: 20px;

      &::before {
        display: block;
        transform: rotate(180deg);
      }
    }

    &.active,
    &:hover {
      color: $primary-color;
    }
  }
}
</style>
