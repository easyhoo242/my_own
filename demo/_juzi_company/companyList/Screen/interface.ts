/* eslint-disable camelcase */
import { createAddressVal } from '@/components/global/Screen/Address/utils'
import { createScopeVal } from '@/components/global/Screen/Scope/utils'
import { AddressOption } from '@/components/global/Screen/Address/interface'
import { CompanyOrderTypes } from '../type'

interface QueryInterface extends Partial<AddressOption> {
  keyword: string
  tag: string
  scope: string
  sub_scope: string
  selected: string
  round: string
  com_fund_needs: string
  status: string
  year: string
  sort: string
}

export interface CompanyScreenValues {
  /** 排序方式 */
  sort: CompanyOrderTypes
  /** 行业 */
  scope: ReturnType<typeof createScopeVal>
  /** 轮次 */
  round: string[]
  /** 地区 */
  address: ReturnType<typeof createAddressVal>
  /** 成立时间 */
  date: string[]
  /** 融资需求 */
  fd: string
  /** 运营状态 */
  state: string
  /** 桔子优选 */
  selected: string
  /** 关键词 */
  keyword: string[]
  /** 标签 */
  tag: string[]
}

export type CompanyQueryInterface = Partial<QueryInterface>

interface PostData {
  // 行业
  scope: string
  sub_scope: string[]
  // 地区
  location: string
  prov: string
  city: string[]
  // 关键词
  keyword: string
  // 标签
  tag: string
  // 轮次
  round: string[]
  // 成立时间
  year: (string | number)[]
  // 融资状态
  com_fund_needs: string
  // 排序
  sort: CompanyOrderTypes
  // 桔子优选 需要登录及vip
  selected: string
  // 运营状态  需要vip
  status: string
}

export type CompanyPostData = Partial<PostData>
