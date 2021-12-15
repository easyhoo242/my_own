import dayjs from 'dayjs'
import { ALL_KEY } from '@/utils'

export function normalizeFormValue(formVal: {
  scope: string
  month: number[]
}) {
  return {
    scope: formVal.scope === ALL_KEY ? undefined : formVal.scope,
    month: formVal.month.filter(Boolean).join('-') || undefined
  }
}

export function isQueryEq(a: Record<string, any>, b: Record<string, any>) {
  a = _normalizeQueryValue(a)
  b = _normalizeQueryValue(b)

  return JSON.stringify(a) === JSON.stringify(b)
}

function _normalizeQueryValue(v: Record<string, any>) {
  return Object.entries(v)
    .filter(([_, value]) => !!value)
    .reduce((acc, [key, value]) => {
      return {
        ...acc,
        [key]: value
      }
    }, {})
}

export function getPostDataMonth(month: (string | number | null)[]) {
  const [_startTime, _endTime] = month
    .filter(Boolean)
    .map((_) => (typeof _ === 'string' ? parseInt(_) : _))

  let startTime: string | undefined
  let endTime: string | undefined

  if (_startTime && _endTime) {
    startTime = dayjs(_startTime).format('YYYY-MM-DD')
    const _endTimeDate = new Date(_endTime)
    endTime = dayjs(
      new Date(_endTimeDate.getFullYear(), _endTimeDate.getMonth() + 1, 0)
    ).format('YYYY-MM-DD')
  }

  return {
    startTime,
    endTime
  }
}
