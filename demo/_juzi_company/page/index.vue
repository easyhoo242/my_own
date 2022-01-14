<template>
  <Space v-if="ssrData">
    <client-only>
      <Module>
        <Screen
          :value="searchVal"
          @change="handleSearchChange"
        />
      </Module>
      <Module>
        <DownloadBar
          :total="ssrData.total"
          :selections="selections"
          :sort="searchVal.sort"
          :get-post-data="getPostData"
          @sort-change="handleSortChange"
          @clear-selections="handleClearSelections"
        />
      </Module>
    </client-only>
    <Module>
      <Table
        :data="ssrData.list"
        :loading="loading"
        :contrast="contrastList.map(_ => _.id)"
        @selection="handleSelectionChange"
        @track="handleCompanyTrack"
        @follow="handleCompanyFollow"
        @contrast="handleCompanyContrast"
        ref="tableRef"
      />

      <div
        v-if="!$store.getters.token"
        class="text-center"
        style="margin-top: 20px;"
      >
        <span
          @click="openLoginModal()"
          class="primary-text cursor-pointer"
        >
          登录网页
        </span>
        <span class="tip-text"> 查看更多信息</span>
      </div>

      <Pagination
        v-else
        :page-size="20"
        :current-page.sync="currentPage"
        :total="ssrData.total"
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        hide-on-single-page
        style="margin-top: 20px;"
        align="right"
      />
    </Module>

    <client-only>
      <Contrast
        :data="contrastList"
        @remove="handleCompanyContrastRemove"
        @remove-all="handleCompanyContrastRemoveAll"
      />
    </client-only>
  </Space>
</template>

<script lang="ts">
/* eslint-disable camelcase */
import { defineComponent, ref, computed } from '@vue/composition-api'
import { remove } from '@vue/shared'
import { Pagination, MessageBox } from 'element-ui'
import {
  useNewTrack,
  useStore,
  useSSRData,
  useSearchValue,
  useQueryFetch
} from '@/composables'
import { postCompanyList, CompanyItem } from '@/api'
import Module from '@/components/global/Module/index.vue'
import Space from '@/components/global/Space/index.tsx'
import Screen from '@/components/pages/companyList/Screen/index.tsx'
import Table from '@/components/pages/companyList/Table/index.vue'
import {
  stateRawOptions,
  selectedRawOptions
} from '@/components/pages/companyList/hook'
import Contrast from '@/components/pages/companyList/Contrast/index.vue'
import {
  CompanyOrderTypes,
  NewCompanyItem
} from '@/components/pages/companyList/type'
import DownloadBar from '@/components/pages/companyList/DownloadBar/index.tsx'
import { useFavoriteDialog } from '@/components/global/FavoriteDialog'
import {
  createScopeVal,
  getScopeQueryValue,
  getPushScopeQueryValue
} from '@/components/global/Screen/Scope/utils'
import {
  createAddressVal,
  getAddressQueryValue,
  normalizeAddressOptions
} from '@/components/global/Screen/Address/utils'
import { ALL_KEY, QueryUtils, vipMessage, isAllKey } from '@/utils'
import openLoginModal from '@/components/global/Modal/Login'
import {
  CompanyQueryInterface,
  CompanyScreenValues,
  CompanyPostData
} from '@/components/pages/companyList/Screen/interface'

const _normalizeCompanies = (data: CompanyItem[]): NewCompanyItem[] =>
  data.map((item) => ({
    ...item,
    trackLoading: false,
    isTrack: item.track_status,
    isFollow: item.follow_status
  }))

export default defineComponent({
  meta: {
    breadcrumb: ['公司']
  },
  head() {
    return {
      title: '国内创业公司,优质创业项目 | IT桔子',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            '这里是IT桔子所收录的国内外创业公司数据库，' +
            '覆盖最新最全的移动互联网、互联网、' +
            '电子商务、SNS社会化媒体等公司。'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: '互联网创业公司,移动互联网,电子商务,SNS社交网络,IT桔子'
        }
      ],
      script: [
        {
          // @ts-ignore
          src: this.$makeCdnLink('assets/front/package/echarts@4.9.0.min.js')
        }
      ]
    }
  },
  components: {
    Screen,
    Table,
    DownloadBar,
    Pagination,
    Module,
    Space,
    Contrast
  },
  created() {
    this.$nuxt.$emit('SET_LAYOUT_THEME', 'dark')
  },
  setup() {
    const { handleCompanyTrack } = useNewTrack()
    const selections = ref<number[]>([])

    return {
      selections,
      handleSelectionChange(val: number[]) {
        selections.value = val
      },
      handleCompanyTrack,
      /** 关注/收藏 */
      ...useFavorite(),
      /** 搜索 */
      ...useCompanyData(),
      /** 对比 */
      ...useContrast()
    }
  }
})
function useCompanyData() {
  const store = useStore()
  const isVip = computed(() => store.state.user.isVip)
  const _staticIsLogin = store.getters.login
  const currentPage = ref(1)
  const tableRef = ref<any>(null)
  let prevPage = currentPage.value

  const handleClearSelections = () => {
    tableRef.value.clearSelection()
  }

  const createSearchValue = () => ({
    /** 行业(scope) 及 子行业(subScopes) */
    scope: createScopeVal(),
    /** 轮次 */
    round: [],
    /** 地区 { type: 'in' | 'out' | 'hot', data: { prov: string, cities: string[] } } */
    address: createAddressVal(),
    /** 成立时间 */
    date: [],
    /** 融资状态 */
    fd: ALL_KEY,
    /** 运营状态 */
    state: ALL_KEY,
    /** 桔子优选 */
    selected: ALL_KEY,
    /** 关键词 */
    keyword: [],
    /** 标签 */
    tag: [],
    /** 排序方式 */
    sort: CompanyOrderTypes.ID
  })

  const { ssrData, clientValue, isClientFetch } = useSSRData<
    NewCompanyItem,
    CompanyScreenValues,
    CompanyQueryInterface
  >({
    fetchRequest: async ({ app, query }) => {
      const res = await app.$axios.post('/v1/companies', {
        page: 1,
        per_page: 20,
        ...__queryToPostData(query.value)
      })

      return {
        list: _normalizeCompanies(res.data.data as CompanyItem[]),
        total: res.data.total
      }
    },
    handleCreateSearchValue: __queryToSearchValue,
    handleError: (err, { redirect }) => {
      console.error(err)
      redirect('/company')
    },
    ssrRefKey: 'company-list'
  })

  const { searchVal, handleSearchChange } = useSearchValue<
    CompanyScreenValues,
    CompanyQueryInterface
  >({
    value: createSearchValue,
    clientValue,
    toQueryFn: (value): CompanyQueryInterface => {
      handleClearSelections()
      currentPage.value = 1

      return {
        ...getPushScopeQueryValue(value.scope),
        ...normalizeAddressOptions(value.address),
        round: QueryUtils.valueToQuery(value.round),
        com_fund_needs: QueryUtils.valueToQuery(value.fd),
        status: QueryUtils.valueToQuery(value.state),
        year: QueryUtils.valueToQuery(value.date),
        selected: QueryUtils.valueToQuery(value.selected),
        keyword: QueryUtils.valueToQuery(value.keyword),
        tag: QueryUtils.valueToQuery(value.tag),
        sort: value.sort
      }
    }
  })

  const { loading } = useQueryFetch({
    isClientFetch,
    searchVal,
    needCollectionDep: true,
    scrollToTop: false,
    queryToPostData: (v) => ({
      ...__queryToPostData(v),
      page: currentPage.value
    }),
    queryToSearchValue: __queryToSearchValue,
    fetchRequest: async (postData) => {
      if (ssrData.value) {
        const res = await postCompanyList(postData)
        ssrData.value.list = _normalizeCompanies(res.data.data)
        ssrData.value.total = res.data.total
      }
    }
  })

  return {
    tableRef,
    ssrData,
    loading,
    searchVal,
    currentPage,
    handleSearchChange,
    handleCurrentChange(page: number) {
      if (isNotShouldTriigerPageChange(page)) {
        vipMessage()
        currentPage.value = prevPage
      } else {
        currentPage.value = page
        prevPage = page
      }

      window.scrollTo({
        top: 0
      })
    },
    handleSortChange(value: CompanyOrderTypes) {
      if (value === CompanyOrderTypes.TOTAL_MONEY && !isVip.value) {
        vipMessage()
      } else {
        handleSearchChange({ sort: value })
      }
    },
    getPostData: __queryToPostData,
    openLoginModal,
    handleClearSelections
  }

  function isNotShouldTriigerPageChange(page: number) {
    return page > 3 && !isVip.value
  }

  function __getSelectedValue(v: unknown) {
    if (typeof v !== 'string' || !_staticIsLogin) {
      return
    }

    if (isVip.value) {
      return v
    }

    // 最不乐观的情况：由vip用户将链接分享给非vip用户
    const option = selectedRawOptions.find((item) => item.name === v)

    // 未知参数 或者 包含需要Vip参数
    if (!option || option.vip) {
      return
    }

    return v
  }

  function __getStateValue(
    v: unknown,
    defaultValue?: string
  ): string | undefined {
    if (typeof v !== 'string') {
      return defaultValue
    }

    if (isVip.value) {
      return v
    }

    const option = stateRawOptions.find((item) => item.name === v)

    // 未知参数 或者 包含需要Vip参数
    if (!option || option.vip) {
      return defaultValue
    }

    return v
  }

  function __queryToPostData(query: CompanyQueryInterface): CompanyPostData {
    return {
      // 行业
      scope: query.scope,
      sub_scope: QueryUtils.checkboxToArray(query.sub_scope),
      // 地区
      location: query.located,
      prov: query.prov,
      city: QueryUtils.checkboxToArray(query.city),
      // 关键词
      keyword: query.keyword,
      // 标签
      tag: query.tag,
      // 轮次
      round: QueryUtils.checkboxToArray(query.round),
      // 成立时间
      year: QueryUtils.checkboxToArray(query.year, [/before_\d+/], true),
      // 融资状态
      com_fund_needs: query.com_fund_needs,
      // 排序
      sort: __getQuerySort(query.sort),
      // 桔子优选 需要登录及vip
      selected: __getSelectedValue(query.selected),
      // 运营状态  需要vip
      status: __getStateValue(query.status)
    }
  }

  function __getQuerySort(sort: unknown): CompanyOrderTypes {
    if (sort === CompanyOrderTypes.TOTAL_MONEY && !isVip.value) {
      return CompanyOrderTypes.ID
    } else {
      const types = [
        CompanyOrderTypes.ID,
        CompanyOrderTypes.UPDATE_TIME,
        CompanyOrderTypes.TOTAL_MONEY
      ] as string[]

      if (typeof sort === 'string' && types.includes(sort)) {
        return sort as CompanyOrderTypes
      }

      return CompanyOrderTypes.ID
    }
  }

  function __queryToSearchValue(
    value: CompanyQueryInterface
  ): CompanyScreenValues {
    const scope = getScopeQueryValue({
      scope: value.scope,
      sub_scope: value.sub_scope
    })

    const address = getAddressQueryValue({
      location: value.location,
      located: value.located,
      prov: value.prov,
      city: value.city
    })

    const state = QueryUtils.radioToValue(value.status)
    const selected = QueryUtils.radioToValue(value.selected)

    return {
      scope,
      address,
      round: QueryUtils.checkboxToArray(value.round),
      fd: QueryUtils.radioToValue(value.com_fund_needs),
      state: isAllKey(state) ? state : __getStateValue(state, ALL_KEY)!,
      selected: isAllKey(selected)
        ? selected
        : __getSelectedValue(selected) || ALL_KEY,
      keyword: QueryUtils.checkboxToArray(value.keyword),
      tag: QueryUtils.checkboxToArray(value.tag),
      date: QueryUtils.checkboxToArray(value.year),
      sort: __getQuerySort(value.sort)
    }
  }
}

function useFavorite() {
  const createFavoriteDialog = useFavoriteDialog()

  return {
    handleCompanyFollow(item: NewCompanyItem) {
      createFavoriteDialog(item.id, (status) => {
        item.isFollow = status
      })
    }
  }
}

function useContrast() {
  const store = useStore()
  const contrastList = ref<NewCompanyItem[]>([])
  const handleCompanyContrastRemove = (row: NewCompanyItem) => {
    if (contrastList.value.includes(row)) {
      remove(contrastList.value, row)
    }
  }
  const handleCompanyContrast = (row: NewCompanyItem) => {
    if (!store.getters.login) {
      openLoginModal()
      return
    }

    if (contrastList.value.includes(row)) {
      handleCompanyContrastRemove(row)
    } else if (contrastList.value.length === 4) {
      MessageBox.alert(
        '最多对比4家公司，请尝试删除其他公司后再添加此公司',
        '提示',
        {
          confirmButtonText: '知道了'
        }
      ).catch(() => {})
    } else {
      contrastList.value.push(row)
    }
  }

  const handleCompanyContrastRemoveAll = () => {
    ;[...contrastList.value].forEach((item) => {
      handleCompanyContrastRemove(item)
    })
  }

  return {
    contrastList,
    handleCompanyContrastRemove,
    handleCompanyContrast,
    handleCompanyContrastRemoveAll
  }
}
</script>
