import { Ref, reactive } from '@vue/composition-api'
import { useRouter } from '@/composables'
import { ALL_KEY } from '@/utils'
import { SSRData } from './type'
import { normalizeFormValue } from './utils'

export const useSearchValue = (ssrData: Ref<SSRData | null | undefined>) => {
  const router = useRouter()

  const searchVal = reactive({
    scope: ALL_KEY,
    month: [] as number[]
  })

  if (process.client && ssrData.value) {
    Object.assign(searchVal, ssrData.value.sv)
  }

  return {
    searchVal,
    handleSearchChange(v: { scope: string; month: Date[] }) {
      // reset `currentPage`
      ssrData.value!.currentPage = 1
      router.push({
        query: {
          ...normalizeFormValue({
            scope: v.scope,
            month: v.month.map((_) => (_ instanceof Date ? _.getTime() : _))
          }),
          page: '1'
        }
      })
    },
    handleCurrentChange(page: number) {
      router.push({
        query: { ...normalizeFormValue(searchVal), page: `${page}` }
      })
    }
  }
}
