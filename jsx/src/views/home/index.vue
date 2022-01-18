<template>
  <div class="container">
    <Contrast :com-list="comList" :arr-list="arrList" @del="delContrast" />
    <home-content
      :thList="thList"
      :comList="comList"
      @contrast="showContrast"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { companyList } from '@/api'
import HomeContent from '@/components/home/index.vue'
import Contrast from '@/components/home/contrast.tsx'

export default defineComponent({
  // inheritAttrs: false,
  components: {
    HomeContent,
    Contrast,
  },
  setup() {
    const uMsg = '已加入对比'
    const liStyle =
      'border-radius: 10px;font-size:12px;width:300px;margin:5px auto;background: #ccc'
    const thList = [
      {
        name: '名称',
        width: '160px',
      },
      {
        name: '地区',
        width: '70px',
      },
      {
        name: '创立时间',
        width: '100px',
      },
      {
        name: '轮次',
        width: '100px',
      },
      {
        name: '行业',
        width: '100px',
      },
      {
        name: '对比',
        width: '50px',
      },
      {
        name: '标签',
        width: '350px',
      },
    ]
    const comList = companyList.data.map((res) => ({
      id: res.id,
      name: res.name,
      bornTime: res.agg_born_time,
      city: res.city,
      logo: res.logo,
      month: res.month,
      round: res.round,
      scope: res.scope,
      type: res.slogan,
      tag: res.tag.map((item) => ({
        tagName: item.tag_name,
        tagId: item.tag_id,
      })),
    }))

    const arrList = ref([])

    // 接收子组件传来的值
    const showContrast = (val) => {
      arrList.value.push(val)
    }

    const delContrast = (val) => {
      arrList.value.splice(arrList.value.indexOf(val), 1)
    }

    return {
      uMsg,
      liStyle,
      arrList,
      thList,
      comList,
      showContrast,
      delContrast,
    }
  },
})
</script>

<style lang="scss" scoped>
.container {
  // 击穿
  ::v-deep .name-list {
    list-style: none;

    .contrast-wrap {
      position: absolute;
      padding: 10px 5px;
      width: 200px;
      background-color: rgba(6, 37, 49, 0.603);
      border-radius: 15px;

      .contrast-list {
        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 5px 2px 0;

          .item-logo {
            flex: 0 0 auto;
            width: 40px;
            height: 40px;
            margin-right: 20px;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .item-content {
            flex: 1 1 auto;
            font-size: 12px;
            text-align: left;
            color: #fff;

            .item-content__desc {
              color: gainsboro;
            }
          }

          .item-del {
            flex: 0 0 50px;
            display: flex;
            justify-content: flex-end;
            align-items: center;

            span {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background-color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
