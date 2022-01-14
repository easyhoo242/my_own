import { ToRefs } from '@/utils'
import {
  useSelectedOptions,
  SelectedShapeFlags
} from '@/components/global/Screen/Selected/utils'
import { CompanyScreenValues } from '../Screen/interface'
import { useOptions } from './useOptions'

export const useSelected = ({
  scope: scopeVal,
  address: addressVal,
  roundOptions,
  round: roundVal,
  dateOptions,
  date: dateVal,
  fdOptions,
  fd: fdVal,
  stateOptions,
  state: stateVal,
  selectedOptions,
  selected: selectedVal,
  keyword: keywordsVal,
  tag: tagSelectVal
}: ReturnType<typeof useOptions> & ToRefs<CompanyScreenValues>) => {
  return useSelectedOptions([
    {
      label: '关键词',
      scope: SelectedShapeFlags.CUSTOM,
      values: keywordsVal,
      key: 'keyword'
    },
    {
      label: '标签',
      scope: SelectedShapeFlags.CUSTOM,
      values: tagSelectVal,
      key: 'tag'
    },
    {
      label: '行业',
      scope: SelectedShapeFlags.SCOPE,
      values: scopeVal,
      key: 'scope'
    },
    {
      label: '轮次',
      options: roundOptions,
      values: roundVal,
      key: 'round'
    },
    {
      label: '地区',
      scope: SelectedShapeFlags.ADDRESS,
      values: addressVal,
      key: 'address'
    },
    {
      label: '成立时间',
      options: dateOptions,
      values: dateVal,
      key: 'date'
    },
    {
      label: '融资需求',
      scope: SelectedShapeFlags.RADIO,
      options: fdOptions,
      values: fdVal,
      key: 'fd'
    },
    {
      label: '运营状态',
      scope: SelectedShapeFlags.RADIO,
      options: stateOptions,
      values: stateVal,
      key: 'state'
    },
    {
      label: '桔子优选',
      scope: SelectedShapeFlags.RADIO,
      options: selectedOptions,
      values: selectedVal,
      key: 'selected'
    }
  ])
}
