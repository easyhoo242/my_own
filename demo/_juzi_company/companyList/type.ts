/* eslint-disable camelcase */
import { TrackItem } from '@/composables'
import { CompanyItem } from '@/api'

export enum CompanyOrderTypes {
  /** 默认排序 */
  ID = 'id',
  /** 更新时间 */
  UPDATE_TIME = 'update_time',
  /** 融资时间(VIP) */
  TOTAL_MONEY = 'total_money'
}

export type NewCompanyItem = CompanyItem & TrackItem & { isFollow: boolean }
