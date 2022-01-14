<script lang="ts">
export { default } from './index'
</script>

<style lang="scss" scoped>
.container {
  .header {
    color: #ff8200;
    font-size: 16px;
  }

  .table-wrap {
    margin: 0 auto;

    table {
      margin: 0 auto;
      border: 1px solid #ccc;
      border-radius: 5px;

      tr {
        height: 40px;
        background-color: #cccccc;

        td {
          border-radius: 5px;

          .tag-wrap {
            display: flex;
            justify-content: start;
            flex-wrap: wrap;
            padding: 2px 5px;

            .tag-span {
              flex: 0 1 auto;
              display: flex;
              align-items: center;
              height: 14px;
              padding: 5px 7px;
              margin: 2px 8px 2px 0;
              font-size: 12px;
              border-radius: 2px;
              background-color: #f2f6fe;
            }
          }
        }
      }
    }
  }
}
</style>
