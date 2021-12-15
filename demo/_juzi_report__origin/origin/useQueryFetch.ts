import { ref, computed, watch, Ref } from '@vue/composition-api'
import { useRoute } from '@/composables'
import { ALL_KEY } from '@/utils'
import { getReportOriginList } from '@/api'
import { SSRData } from './type'
import { isQueryEq, getPostDataMonth } from './utils'

export const useQueryFetch = (
  ssrData: Ref<SSRData | null | undefined>,
  searchVal: {
    scope: string
    month: number[]
  }
) => {
  const route = useRoute()

  const loading = ref(false)

  const postData = computed(() => {
    return {
      scope: searchVal.scope === ALL_KEY ? undefined : searchVal.scope,
      month: searchVal.month || [],
      per_page: 20,
      page: ssrData.value ? ssrData.value.currentPage : 1
    }
  })

  watch(
    () => postData.value,
    async (val, prevVal) => {
      if (!ssrData.value) {
        return
      }

      if (isQueryEq(val, prevVal) && !ssrData.value.inClientFetch) {
        return
      }

      ssrData.value.inClientFetch = false
      loading.value = true

      const { month, ...restVal } = val
      const { startTime, endTime } = getPostDataMonth(month)

      try {
        const res = await getReportOriginList({
          ...restVal,
          start_time: startTime || undefined,
          end_time: endTime || undefined
        })

        Object.assign(ssrData.value, {
          list: res.data.data,
          total: res.data.total
        })
      } catch (e) {
      } finally {
        loading.value = false
      }
    }
  )

  watch(
    () => route.value.query,
    (v) => {
      Object.assign(searchVal, {
        scope: v.scope || ALL_KEY,
        month: v.month
          ? (v.month as string).split('-').map((_) => parseInt(_))
          : []
      })

      ssrData.value!.currentPage = parseInt(v.page as string) || 1

      window.scrollTo({
        top: 0
      })
    }
  )

  return {
    loading
  }
}
