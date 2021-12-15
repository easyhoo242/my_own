import { useContext, useAsync } from '@/composables'
import { ALL_KEY } from '@/utils'
import { SSRData } from './type'
import { getPostDataMonth } from './utils'

export const useSSRData = () => {
  const { app, query } = useContext()

  const ssrData = useAsync(async () => {
    const currentPage =
      !query.value.page ||
      Array.isArray(query.value.page) ||
      isNaN(parseInt(query.value.page))
        ? 1
        : parseInt(query.value.page)

    const month = query.value.month
    /* eslint-disable camelcase */
    const { startTime: start_time, endTime: end_time } = getPostDataMonth(
      month ? (month as string).split('-') : []
    )

    const [downloadTop, listData] = await Promise.all([
      app.$axios.get('/report/scope_down_top?type=3').then((r) => r.data),
      process.client
        ? Promise.resolve({
            list: [],
            total: 0,
            inClientFetch: true
          })
        : app.$axios
            .get('/report/juzi_report', {
              params: {
                per_page: 20,
                page: currentPage,
                scope: query.value.scope,
                start_time,
                end_time
              }
            })
            .then((r) => ({
              list: r.data.data,
              total: r.data.total,
              inClientFetch: false
            }))
    ])

    return {
      downloadTop,
      currentPage,
      // search value
      sv: {
        scope: query.value.scope || ALL_KEY,
        month: query.value.month
          ? (query.value.month as string).split('-').map((_) => parseInt(_))
          : []
      },
      ...listData
    } as SSRData
  }, 'report-origin')

  return { ssrData }
}
