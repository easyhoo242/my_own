<template>
  <div class="container">
    <Contrast :comList="comList" :arrList="arrList" />
    <HomeContent :thList="thList" :comList="comList" @contrast="showContrast" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { companyList } from '@/api'
import HomeContent from './HomeContent/index.vue'
import Contrast from './HomeContent/contrast.tsx'

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
    // const contrastComList = ref(
    //   comList.filter((res) => new Set(arrList.value).has(res.id))
    // )

    // 接收子组件传来的值
    const showContrast = (val) => {
      console.log(val)
      arrList.value.push(val)
      console.log('id', arrList)
      // contrastComList.value = ref(
      //   comList.filter((res) => new Set(arrList.value).has(res.id))
      // )
      // console.log('res', contrastComList)
    }

    return {
      uMsg,
      liStyle,
      arrList,
      thList,
      comList,
      // 已加入对比的公司列表
      // contrastComList,
      showContrast,
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
      padding: 10px 5px;
      width: 200px;

      .contrast-list {
        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .item-logo {
            flex: 0 0 auto;
            width: 40px;
            height: 40px;
            margin-right: 10px;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .item-content {
            flex: 1 1 auto;
          }
        }
      }
    }
    .item {
      color: #ff8200;
      font-size: 12px;
    }
  }
}
</style>
