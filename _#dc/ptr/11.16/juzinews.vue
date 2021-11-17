<template>
  <Space :size="20">
    <client-only>
      <Screen
        @change="handleChange"
        class="news-screen-wrap"
      />
    </client-only>
    <List
      v-loading="loading"
      :data="data"
    />
    <Pagination
      :total="total"
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      align="right"
    />
  </Space>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import Space from '@/components/global/Space/index.vue'
import Screen from '@/components/pages/news/Screen/index.tsx'
import List from '@/components/pages/news/List/index.vue'
import {
  SourceType,
  FormValueType,
  ISearchType,
  BaseListData,
  ListData
} from '@/components/pages/news/type'
import {
  postNewsData,
  NewsSelectedFetchData,
  NewsInvestfirmFetchData,
  NewsGrabFetchData,
  FetchDataType
} from '@/api'
import { ALL_KEY } from '@/utils'
import dayjs from 'dayjs'
import { Pagination } from 'element-ui'
import { debounce } from 'throttle-debounce'

interface NormalizeFunction<T extends SourceType> {
  (data: FetchDataType<T>): ListData[]
}

const normalizeDataHandlersMap = new Map<
  SourceType,
  NormalizeFunction<SourceType>
>()
normalizeDataHandlersMap.set(
  SourceType.SELECTED,
  normalizeSelectedData as NormalizeFunction<SourceType.SELECTED>
)
normalizeDataHandlersMap.set(
  SourceType.INVESTFIRM,
  normalizeInvestfirmData as NormalizeFunction<SourceType.INVESTFIRM>
)
normalizeDataHandlersMap.set(
  SourceType.GRAB,
  normalizeGrabData as NormalizeFunction<SourceType.GRAB>
)

export default defineComponent({
  meta: {
    breadcrumb: ['新闻']
  },
  components: {
    Screen,
    List,
    Pagination,
    Space
  },
  setup() {
    const data = ref<unknown[]>([])
    const total = ref(0)
    const currentPage = ref(1)
    const loading = ref(false)

    let currentForm: FormValueType

    // radio to array
    const _rta = (value: ISearchType) => {
      return value === ALL_KEY ? [] : [value]
    }

    const createPostBodyData = (value: FormValueType) => {
      const BASIC_DATA = {
        page: currentPage.value,
        per_page: 10,
        type: value.source
      }

      switch (value.source) {
        case SourceType.SELECTED:
          return {
            ...BASIC_DATA,
            keywords: value.keyword,
            news_type: _rta(value.type),
            scope: _rta(value.scope)
          }
        case SourceType.INVESTFIRM:
          return {
            ...BASIC_DATA,
            keywords: value.keyword,
            news_type: _rta(value.type)
          }
        case SourceType.GRAB:
          return {
            ...BASIC_DATA,
            keywords: value.keyword,
            news_type_auto: _rta(value.type),
            scope: _rta(value.scope),
            source: _rta(value.media)
          }
        default:
          return {}
      }
    }

    const createPostFn = async (value: FormValueType) => {
      const res = await postNewsData<typeof value['source']>(
        createPostBodyData(value)
      )
      total.value = res.data.page.total
      return res.data.data
    }

    const handleChange = debounce(150, async (value: FormValueType) => {
      try {
        loading.value = true
        // reset `currentPage` and `currentForm`
        if (currentForm !== value) {
          currentPage.value = 1
        }
        currentForm = value

        // fetch news data
        const res = await createPostFn(value)

        // handle news data
        const handler = normalizeDataHandlersMap.get(value.source)
        if (handler) {
          data.value = handler(res)
        }
      } catch (e) {
      } finally {
        loading.value = false
      }
    })

    return {
      data,
      total,
      currentPage,
      loading,
      handleCurrentChange() {
        if (currentForm) {
          handleChange(currentForm)
        }
      },
      handleChange
    }
  }
})

// default normalize data
function _dnd(
  data: NewsSelectedFetchData | NewsInvestfirmFetchData | NewsGrabFetchData
): BaseListData {
  return {
    id: data.id,
    url: data.url,
    date: dayjs((data.time as number) * 1000).format('YYYY-MM-DD'),
    title: data.title,
    origin: data.main_url
  }
}

function normalizeSelectedData(data: NewsSelectedFetchData[]): ListData[] {
  return data.map((item) => ({
    ..._dnd(item),
    data: [
      {
        type: 'company',
        id: item.com.id,
        logo: item.com.logo,
        name: item.com.name,
        tags: [item.com.scope, item.com.prov]
      }
    ]
  }))
}

function normalizeInvestfirmData(data: NewsInvestfirmFetchData[]): ListData[] {
  return data.map((item) => ({
    ..._dnd(item),
    data: [
      {
        type: 'investfirm',
        id: item.invst_id,
        logo: item.logo,
        name: item.name,
        tags: []
      }
    ]
  }))
}

function normalizeGrabData(data: NewsGrabFetchData[]): ListData[] {
  return data.map((item) => ({
    ..._dnd(item),
    origin: `来源: ${item.source}`,
    // @ts-ignore
    data: item.rel_com.map((com) => ({
      type: 'company',
      id: com.id,
      logo: com.logo,
      name: com.name,
      tags: [com.scope, com.prov]
    }))
  }))
}
</script>

<style lang="scss" scoped>
.news-screen-wrap {
  border: 1px solid #eee;
  padding: 5px 0;
  margin-top: 15px;
}
</style>
