import { VNode } from 'vue'
import { ref } from '@vue/composition-api'
import { IApiOption } from '@/interface/common'
import { getAllRoundOptions } from '@/api'
import { makeDateOptions, makeOptions } from '@/utils'
import {
  createClickTipsRender,
  PreferredTipFlags
} from '@/components/global/PreferredTipDialog/index.ts'

const withNewOptions = (
  options: {
    name: string
    vip?: boolean
    tooltip?: () => string | VNode
  }[]
) =>
  options.map((_) => ({
    ..._,
    id: _.name
  }))

export const stateRawOptions = makeOptions(
  '未上线,运营中,已关闭,已转型',
  ['已关闭', '已转型'],
  true
)

export const selectedRawOptions = withNewOptions([
  {
    name: '知名企业',
    vip: true,
    tooltip: createClickTipsRender(
      '知名企业',
      '(查看知名企业名单)',
      PreferredTipFlags.COMPANY
    )
  },
  {
    name: '知名高校',
    vip: true,
    tooltip: () => '创始团队毕业于清华北大斯坦福等名校'
  },
  {
    name: '知名风投',
    vip: true,
    tooltip: createClickTipsRender(
      '知名风投',
      '(查看知名风投名单)',
      PreferredTipFlags.CAPITAL
    )
  },

  {
    name: '连续获投',
    vip: true,
    tooltip: () => '公司在12个月有2轮及更多融资'
  },
  { name: '已认领', vip: true, tooltip: () => '已被桔子用户认领的公司' },
  { name: '二次上市', vip: true, tooltip: () => '在多个交易所上市的公司' },
  { name: 'IPO排队', vip: true, tooltip: () => '拟上市的公司' },
  { name: '科创板', vip: true, tooltip: () => '在科创板申报和上市的公司' },
  { name: '独角兽', tooltip: () => '估值超过10亿美元的公司' },
  { name: '千里马', tooltip: () => '估值为10亿人民币-10亿美元的公司' },
  { name: '公司解读报告', tooltip: () => '公司解读报告' }
])

export const useOptions = () => {
  // ronud
  const roundOptions = ref<IApiOption[]>([])
  getAllRoundOptions().then((res) => {
    roundOptions.value = res.data.map((item) => ({
      id: item.name,
      name: item.name
    }))
  })

  // date
  const dateOptions = ref<IApiOption[]>(makeDateOptions(undefined, '_'))

  // financing demand
  const fdOptions = ref(
    makeOptions('需要融资,不需要融资,寻求被收购,不明确', false)
  )

  // status
  const stateOptions = ref(stateRawOptions)

  // orange selected
  const selectedOptions = ref(selectedRawOptions)

  return {
    roundOptions,
    dateOptions,
    fdOptions,
    stateOptions,
    selectedOptions
  }
}
