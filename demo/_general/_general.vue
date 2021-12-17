<template>
  <section class="af-wrap">
    <template v-if="isInit">
      <div
        :style="{
          backgroundImage: `url(${$makeCdnLink(`/images/${ssrData.config_json.bgImg}`)})`,
          backgroundColor: ssrData.config_json.bgColor
        }"
        class="af-header-wrap text-center"
      >
        <h1 class="af-header__title">{{ ssrData.title }}</h1>
        <div class="af-header__desc">{{ ssrData.desc }}</div>
      </div>

      <div class="af-body">
        <GeneralTable
          :headers="tableTrData"
          :data="ssrData.tableData"
          :loading="loading"
          style="margin-bottom: 20px;"
        >
          关键词：
          <el-input
            v-model="keyword"
            :disabled="!$store.getters.login"
            :placeholder="!$store.getters.login ? '登录后进行搜索' : '输入关键词，按下回车键搜索'"
            @keyup.enter.native="sureKeyword = $event.target.value.trim()"
            type="text"
            prefix-icon="el-icon-search"
            style="width: 260px;margin-bottom:15px"
          />
          <div class="af-body-select-wrap d-flex align-items-center justify-content-between">
            <div class="af-body-select__total flex-0">
              共<span class="primary-text">{{ ssrData.total }}</span>条结果
            </div>
            <div class="flex-0">
              <el-select
                :value="addressVal"
                @change="handleSelectChange('address', $event)"
                size="small"
                style="width: 164px; margin-right: 15px"
              >
                <el-option
                  v-for="item in addressOptions"
                  :key="item.key"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select
                :value="scopeVal"
                @change="handleSelectChange('scope', $event)"
                size="small"
                style="width: 164px; margin-right: 15px"
              >
                <el-option
                  v-for="item in scopeOptions"
                  :key="item.key"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select
                :value="yearVal"
                @change="handleSelectChange('year', $event)"
                size="small"
                style="width: 164px; margin-right: 15px"
              >
                <el-option
                  v-for="item in yearOptions"
                  :key="item.key"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select
                :value="roundVal"
                @change="handleSelectChange('round', $event)"
                size="small"
                style="width: 164px; margin-right: 15px"
              >
                <el-option
                  v-for="item in roundOptions"
                  :key="item.key"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </GeneralTable>

        <Pagination
          v-if="$store.getters.login"
          :total="ssrData.total"
          :current-page.sync="currentPage"
          :page-size="50"
          @current-change="handleCurrentPage"
          hide-on-single-page
          layout="prev, pager, next"
          background
          align="right"
        />
        <LoginBar v-else />

        <div class="af-footer d-flex justify-content-between">
          <A
            v-for="(item, index) in footerImgList"
            :key="index"
            :style="{ backgroundImage: `url(${$imgPath}/${item.bgImg})` }"
            :href="item.link"
            class="af-footer-item flex-0"
          >
            <h2>{{ item.title }}</h2>
            <div>{{ item.desc }}</div>
          </A>
        </div>
      </div>
    </template>
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  h,
  watch,
  computed,
  nextTick
} from '@vue/composition-api'
import { NOOP } from '@vue/shared'
import dayjs from 'dayjs'
import { debounce } from 'throttle-debounce'
import { useContext, useAsync, useStore } from '@/composables'
import GeneralTable from '@/components/pages/general/Table/index.vue'
import { getCompanyAddress, getScopes, getGeneralListData } from '@/api'
import { Pagination } from 'element-ui'
import { ALL_KEY, vipMessage } from '@/utils'
import A from '@/components/global/A/index.vue'
import LoginBar from '@/components/global/LoginBar/index.vue'

const useScreen = () => {
  const addressOptions = ref<
    { key: number | string; value: string; label: string }[]
  >([
    {
      key: ALL_KEY,
      value: ALL_KEY,
      label: '全部地区'
    }
  ])

  const scopeOptions = ref<
    { key: number | string; value: number | string; label: string }[]
  >([
    {
      key: ALL_KEY,
      value: ALL_KEY,
      label: '全部行业'
    }
  ])

  const roundOptions = ref<
    { key: number | string; value: string; label: string }[]
  >([
    {
      key: ALL_KEY,
      value: ALL_KEY,
      label: '全部轮次'
    }
  ])

  if (process.client) {
    getCompanyAddress().then((res) => {
      addressOptions.value = [
        {
          key: ALL_KEY,
          value: ALL_KEY,
          label: '全部地区'
        },
        ...[...Object.keys(res.data.in), '海外'].map((item, index) => ({
          key: index + 1,
          value: item,
          label: item
        }))
      ]
    })

    getScopes().then((res) => {
      scopeOptions.value = [
        {
          key: ALL_KEY,
          value: ALL_KEY,
          label: '全部行业'
        },
        ...res.data.map((item) => ({
          key: item.id,
          value: item.id,
          label: item.name
        }))
      ]
    })

    getScopes().then((res) => {
      roundOptions.value = [
        {
          key: ALL_KEY,
          value: ALL_KEY,
          label: '全部轮次'
        }
      ]
    })
  }

  const restYears = []

  for (let i = new Date().getFullYear(); i > 2013; i--) {
    restYears.push({
      key: i,
      value: i,
      label: `${i}`
    })
  }

  const roundList = [
    '种子轮',
    '天使轮',
    'Pre-A轮',
    'A轮',
    'A+轮',
    'Pre-B轮',
    'B轮',
    'B+轮',
    'C轮',
    'C+轮',
    'D轮',
    'D+轮',
    'E轮',
    'E+轮',
    'F轮',
    'G轮',
    'H轮',
    'Pre-IPO',
    '战略投资'
  ]

  // const roundLIstC = roundList.map((res, index) => {
  //   key: index + 1,
  //   value: res,
  //   label: res
  // })

  return {
    addressOptions,
    scopeOptions,
    yearOptions: [
      {
        key: ALL_KEY,
        value: ALL_KEY,
        label: '全部时间'
      },
      ...restYears,
      {
        key: 'before,2013',
        value: 'before,2013',
        label: '2013年及以前'
      }
    ]
  }
}

const handleTableResData = (data: any) => {
  return {
    tableData: data.data.map((item: any) => ({
      ...item,
      ...(item.event
        ? {
            eventMoney: item.event.money,
            eventTime: dayjs(item.event.time * 1000).format('YYYY-MM-DD'),
            eventRound: item.event.round
          }
        : {
            eventMoney: '-',
            eventTime: '-',
            eventRound: '-'
          }),
      bornTime: dayjs(item.born_time * 1000).format('YYYY-MM')
    })),
    total: data.page.total
  }
}

export default defineComponent({
  layout: 'fill',
  components: {
    Pagination,
    GeneralTable,
    LoginBar
  },
  created() {
    this.$nuxt.$emit('SET_LAYOUT_THEME', 'dark')
  },
  setup() {
    const { app, params, error } = useContext()
    const store = useStore()
    const ssrData = useAsync(async () => {
      try {
        const { id } = params.value
        if (!id || isNaN(parseInt(id))) {
          throw new TypeError(`GENERAL: 非法ID - ${id}`)
        }

        const [data, list] = await Promise.all([
          app.$axios.get(`/thematic/detail/${id}`).then((res) => ({
            ...res.data,
            title: res.data.name,
            desc: res.data.des
          })),
          app.$axios.get(`/thematic/detail/list/${id}`).then((res) => {
            return handleTableResData(res.data)
          })
        ])

        if (data.is_hidden) {
          throw new TypeError(`GENERAL: ${id} - 此页面为隐藏页面`)
        }

        return { ...data, ...list }
      } catch (e) {
        console.error(e)
        error({
          statusCode: 404
        })
        return e
      }
    }, `general-${params.value.id}`)

    const currentPage = ref(1)
    const loading = ref(false)

    const keyword = ref('')
    const sureKeyword = ref('')
    const scopeVal = ref(ALL_KEY)
    const addressVal = ref(ALL_KEY)
    const yearVal = ref(ALL_KEY)
    const bornVal = ref(ALL_KEY)
    const roundVal = ref(ALL_KEY)

    const fetchVals = computed(() => ({
      scope: scopeVal.value === ALL_KEY ? undefined : scopeVal.value,
      prov: addressVal.value === ALL_KEY ? undefined : addressVal.value,
      year: yearVal.value === ALL_KEY ? undefined : yearVal.value,
      round: roundVal.value === ALL_KEY ? undefined : roundVal.value,
      keyword: sureKeyword.value.trim() || undefined
    }))

    const handleFetchTableData = debounce(150, () => {
      loading.value = true
      getGeneralListData(params.value.id, {
        page: currentPage.value,
        ...fetchVals.value
      }).then((res) => {
        if (ssrData.value) {
          const { tableData, total } = handleTableResData(res.data)
          ssrData.value.tableData = tableData
          ssrData.value.total = total
          loading.value = false

          nextTick(() => {
            window.scrollTo({
              top: 0
            })
          })
        }
      })
    })

    watch(
      () => fetchVals.value,
      () => {
        currentPage.value = 1
        handleFetchTableData()
      }
    )

    return {
      loading,
      ssrData,
      isInit: computed(() => {
        if (ssrData.value) {
          if (ssrData.value instanceof Error) {
            return false
          }
          return true
        }

        return false
      }),
      ...useScreen(),
      currentPage,
      keyword,
      sureKeyword,
      scopeVal,
      addressVal,
      yearVal,
      bornVal,
      roundVal,
      handleCurrentPage() {
        handleFetchTableData()
      },
      handleSelectChange(type: string, value: string) {
        if (!store.state.user.isVip) {
          vipMessage()
          return
        }

        switch (type) {
          case 'address':
            addressVal.value = value
            break
          case 'scope':
            scopeVal.value = value
            break
          case 'year':
            yearVal.value = value
            break
          default:
            NOOP()
        }
      },
      tableTrData: [
        {
          label: '序号',
          width: '70px',
          align: 'center',
          prop: 'com_id',
          render(_: any, rowIndex: number) {
            return h('span', `${(currentPage.value - 1) * 50 + rowIndex + 1}`)
          }
        },
        {
          label: '公司',
          width: '180px',
          prop: 'name',
          render(item: any) {
            return h('div', { class: 'af-company-box d-flex' }, [
              h(
                'div',
                { class: 'af-logo-box flex-0 d-flex align-items-center' },
                [
                  h('c-img', {
                    props: {
                      src: item.logo
                    }
                  })
                ]
              ),
              h('div', { class: 'flex-fill' }, [
                h(
                  'a',
                  { attrs: { href: `/company/${item.com_id}` } },
                  item.name
                ),
                h('div', { class: 'af-com-tip' }, `${item.prov}-${item.city}`)
              ])
            ])
          }
        },
        { label: '行业', width: '90px', prop: 'scope', align: 'center' },
        {
          label: '成立时间',
          width: '100px',
          prop: 'bornTime',
          align: 'center'
        },
        {
          label: '当前轮次',
          width: '120px',
          prop: 'eventRound',
          align: 'center'
        },
        {
          label: '最新投资时间',
          width: '160px',
          prop: 'eventTime',
          align: 'center'
        },
        {
          label: '最新融资金额',
          prop: 'eventMoney',
          align: 'center',
          width: '160px'
        },
        {
          label: '详情',
          render(item: any) {
            return h(
              A,
              {
                attrs: {
                  href: `/company/${item.com_id}`
                }
              },
              [
                h(
                  'el-button',
                  { props: { type: 'info', size: 'mini' } },
                  '详情'
                )
              ]
            )
          },
          align: 'center'
        }
      ],
      footerImgList: [
        {
          title: '查看大公司投资版图',
          desc: '一键看懂百度、阿里、腾讯等大公司投资信',
          link: '/company_map/alibaba',
          bgImg: 'd487f0d70d37999afa763a5781b76d83.png'
        },
        {
          title: '查看独角兽榜单',
          desc: '最新估值超10亿美元的独角兽公司榜单',
          link: '/unicorn',
          bgImg: 'd3d02563d6fbe828ec592922855c29cc.png'
        },
        {
          title: 'IPO上市版图',
          desc: '近4000家上榜企业数据一览，哪家企业',
          link: '/ipo',
          bgImg: '0a3897cd05ad61774c0ca8129d5008e1.png'
        },
        {
          title: '数据定制',
          desc: '覆盖创投领域全数据、精确获取所需数据维',
          link: '/juzi_bigdata',
          bgImg: '3923e0b1c79652ce8bc6f89cea649e44.png'
        }
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
.af-wrap {
  margin-top: -20px;
  padding-bottom: 50px;
}

.af-header-wrap {
  padding: 65px 0;
  background-color: #2c2c2c;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 1920px;
  color: $white;
  margin-bottom: 24px;

  .af-header__title {
    margin-bottom: 10px;
    font-size: 32px;
  }

  .af-header__desc {
    margin: 0 auto;
    width: 630px;
  }
}
.af-body {
  width: 1000px;
  margin: 0 auto;

  .af-body-header {
    margin-bottom: 15px;
    width: 305px;
  }

  .af-body-select-wrap {
    position: sticky;
    top: 0;
    background-color: #444;
    padding: 4px 10px;

    .af-body-select__total {
      width: 100px;
      color: $white;
      margin-right: 50px;
    }
  }
}

.af-footer {
  margin-top: 34px;

  .af-footer-item {
    width: 240px;
    height: 120px;
    padding: 20px 15px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    color: $white;

    &:hover {
      text-decoration: underline;
    }

    h2 {
      margin-bottom: 5px;
      font-size: 18px;
      font-weight: 500;
    }

    div {
      font-size: 13px;
    }
  }
}
</style>
