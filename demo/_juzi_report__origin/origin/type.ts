import { ReportDownloadItem } from '@/api'

export interface SSRData {
  downloadTop: ReportDownloadItem[]
  currentPage: number
  // search value
  sv: {
    scope: string
    month: number[]
  }
  list: any[]
  total: number
  inClientFetch: boolean
}
