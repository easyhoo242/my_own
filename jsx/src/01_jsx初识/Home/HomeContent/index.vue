<script lang="ts">
export { default } from './index'
</script>

<style lang="scss" scoped>
.container {
  .header {
    color: #ff8200;
    font-size: 22px;
  }

  .table-wrap {
    margin: 20px auto;
    padding: 5px 10px;
    width: 1120px;
    border-radius: 5px;
    background-color: #fff;

    table {
      width: 100%;
      margin: 0 auto;
      border-radius: 5px;

      tr {
        height: 40px;
        border-radius: 15px;

        &:first-child:hover {
          background-color: #fff;
        }

        &:hover {
          background-color: rgb(240, 235, 235);
        }

        td {
          .name-box {
            display: flex;
            align-items: center;
            padding: 5px;

            .name-box__logo {
              flex: 0 0 auto;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 40px;
              height: 40px;
              margin-right: 10px;

              img {
                height: 100%;
                width: 100%;
              }
            }

            .name-box__content {
              flex: 1 1 auto;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: space-between;

              .name-box__content--title {
                font-size: 14px;
              }
              .name-box__content--desc {
                font-size: 12px;
                text-align: left;
              }
            }
          }

          .tag-wrap {
            display: flex;
            justify-content: start;
            align-items: flex-start;
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
