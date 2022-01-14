<template>
  <div class="container">
    <div>
      <ul class="name-list">
        <li
          v-for="(item, index) in arrList"
          :key="index"
          :style="liStyle"
          class="item"
        >
          <br />
          {{ `${item} ${uName}` }}
          {{ ` ${item} 瓜皮子是金子做的还是瓜粒子是金子做的 ` }}
        </li>
      </ul>
    </div>
  </div>
  <HomeContent :thList="thList" :comList="comList" />
</template>

<script>
import { defineComponent } from 'vue'
import { companyList } from '@/api'
import HomeContent from './HomeContent/index.vue'

export default defineComponent({
  inheritAttrs: false,
  components: {
    HomeContent,
  },
  setup() {
    const uName = '你这瓜多少钱一斤呐'
    const liStyle =
      'border-radius: 10px;font-size:12px;width:300px;margin:5px auto;background: #ccc'

    const arrList = ['aa', 'tt']
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
    return {
      uName,
      liStyle,
      arrList,
      thList,
      comList,
    }
  },
})
</script>

<style lang="scss" scoped>
.name-list {
  list-style: none;

  .item {
    color: #ff8200;
    font-size: 12px;
  }
}
</style>
