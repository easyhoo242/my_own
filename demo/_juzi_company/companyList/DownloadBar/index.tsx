import {
  defineComponent,
  ref,
  nextTick,
  PropType,
  toRef
} from '@vue/composition-api'
import { useListDownload, GetPostData } from '@/composables'
import { Tooltip, Dialog } from 'element-ui'
import {
  getCompanyCheckMoney,
  exportDownloadUnicornCheck,
  exportDownloadHorseCheck,
  postExportCompanyDown,
  exportUnicornFile,
  exportHorseFile,
  postCompanyListChart
} from '@/api'
import { HttpResponse } from '@/api/_utils'
import A from '@/components/global/A/index.vue'
import Space from '@/components/global/Space/index.tsx'
import { CompanyOrderTypes } from '../type'

const getYearOptions = (value?: string[]) => {
  if (!value) {
    return {
      hasBeforeYear: false,
      options: []
    }
  }

  const options = [...value]
  const re = /before_(\d+)/
  let index = -1

  for (let i = 0; i < options.length; i++) {
    if (re.test(options[i])) {
      index = i
      break
    }
  }

  if (index > -1) {
    const matched = options[index].match(re)
    options[index] = matched ? `before,${matched[1]}` : ''
  }

  return {
    hasBeforeYear: index > -1,
    options
  }
}

export default defineComponent({
  props: {
    total: {
      type: Number,
      default: 0
    },
    selections: {
      type: Array as PropType<number[]>,
      default: () => []
    },
    sort: {
      type: String as PropType<CompanyOrderTypes>,
      default: 'id'
    },
    getPostData: {
      type: Function as PropType<GetPostData>,
      required: true
    }
  },
  setup(props, { emit }) {
    const getIsOnlyHorseOrUnicorn = () => {
      const value = getDownloadPostData()
      const isUnicorn = value.selected === '独角兽'
      const isHorse = value.selected === '千里马'
      const valueKeys = Object.keys(value).filter(
        (key) => key !== 'sort' && key !== 'selected'
      )

      return {
        isOnly: valueKeys.length === 0,
        isUnicorn,
        isHorse
      }
    }

    const branchCheckOrDownload = async <T extends any>(
      defaultRequest: (
        value: { isOnly: boolean; isUnicorn: boolean; isHorse: boolean }
      ) => Promise<HttpResponse<T>>,
      hosreRequest: () => Promise<HttpResponse<T>>,
      unicornRequest: () => Promise<HttpResponse<T>>
    ) => {
      const { isUnicorn, isHorse, isOnly } = getIsOnlyHorseOrUnicorn()

      if (isOnly) {
        if (isHorse) {
          return await hosreRequest()
        } else if (isUnicorn) {
          return await unicornRequest()
        }
      }

      return await defaultRequest({
        isOnly,
        isUnicorn,
        isHorse
      })
    }

    const { getDownloadPostData, ...restListDownlaodOptions } = useListDownload(
      {
        getPostData: (data) => props.getPostData(data),
        getSelectionPostData: () => ({ com_list: props.selections }),
        checkMoneyFn: (total) =>
          branchCheckOrDownload(
            ({ isHorse, isUnicorn }) =>
              getCompanyCheckMoney(
                total,
                // 只有千里马和独角兽需要此参数
                isHorse ? '千里马' : isUnicorn ? '独角兽' : undefined
              ),
            // 检查千里马全部数据所需要的桔子币
            () => exportDownloadHorseCheck(total),
            // 检查独角兽全部数据所需要的桔子币
            () => exportDownloadUnicornCheck(total)
          ),
        fileDownloader: (data) => {
          const yearOptions = getYearOptions(data.year as string[]).options

          return branchCheckOrDownload(
            () =>
              postExportCompanyDown({
                ...data,
                // @ts-ignore
                year: yearOptions.length > 0 ? yearOptions : undefined,
                type: 'all'
              }),
            // 下载全部千里马数据
            () => exportHorseFile(),
            // 下载全部独角兽数据
            () => exportUnicornFile()
          )
        },
        total: toRef(props, 'total'),
        selections: toRef(props, 'selections'),
        onClearSelection: () => {
          emit('clear-selections')
        }
      }
    )

    return {
      sortOptions: [
        { value: CompanyOrderTypes.ID, label: '最新收录' },
        { value: CompanyOrderTypes.UPDATE_TIME, label: '更新时间' },
        { value: CompanyOrderTypes.TOTAL_MONEY, label: '融资金额(VIP)' }
      ],
      ...restListDownlaodOptions,
      ...useChart(getDownloadPostData)
    }
  },
  render() {
    const {
      sortOptions,
      isSelected,
      selections,
      isDisabled,
      total,
      handleDownloadAll,
      handleDownloadBySelection,
      handleDownloadByPaging,

      // chart dialog
      handleOpenChartDialog,
      visible,
      chartLoading
    } = this

    const downloadContent = isSelected
      ? [
          <span class="tip-text">
            已选择
            <span class="primary-text">{selections.length}</span>条
          </span>,
          <el-button
            type="warning"
            size="mini"
            disabled={isDisabled}
            onClick={() => handleDownloadBySelection()}
          >
            下载
          </el-button>
        ]
      : [
          <span class="tip-text">
            共<span class="primary-text">{total}</span>
            条公司
          </span>,
          <el-button
            type="warning"
            size="mini"
            disabled={isDisabled}
            onClick={() => handleDownloadAll()}
          >
            全部下载
          </el-button>
        ]

    return (
      <div class="company-download-bar d-flex justify-content-between">
        <Space direction="horizontal">
          {downloadContent}
          <div class="company-download-bar__paging">
            <Space direction="horizontal">
              <span class="tip-text">或</span>
              <el-input value="1" size="mini" disabled style="width: 80px;" />
              <span>-</span>
              <el-input
                vModel={this.pageModel}
                disabled={isDisabled}
                size="mini"
                placeholder="结束页"
                style="width: 80px;"
              />
              <div>
                <el-button
                  type="warning"
                  size="mini"
                  disabled={isDisabled || this.pageModel.trim() === ''}
                  onClick={() => handleDownloadByPaging()}
                  style="margin-right: 5px;"
                >
                  分页下载
                </el-button>
                <Tooltip placement="top">
                  <div slot="content" style="width: 200px; line-height: 1.5;">
                    {'下载的数据表为excel，包含字段：公司名称、公司简介、工商名称、' +
                      '公司网址、成立时间、地点、运营状态、行业、子行业、所有融资信息' +
                      '（融资时间、轮次、融资金额、投资方）、融资总额、最新估值、' +
                      '团队信息、详细地址、公开电话、公开邮箱、笔记'}
                  </div>
                  <i class="el-icon-info" />
                </Tooltip>
              </div>
            </Space>
          </div>
          <el-select
            value={this.sort}
            onChange={(value: string) => this.$emit('sort-change', value)}
            size="mini"
            disabled={isDisabled}
          >
            {sortOptions.map((item) => (
              <el-option
                key={item.value}
                value={item.value}
                label={item.label}
              />
            ))}
          </el-select>
        </Space>
        <div>
          <el-button
            type="primary"
            size="mini"
            style="margin-right: 10px;"
            disabled={isDisabled}
            onClick={() => handleOpenChartDialog()}
          >
            公司成立统计
          </el-button>
          <A href="/addcompany">
            <el-button type="warning" size="mini">
              提交公司
            </el-button>
          </A>
        </div>

        <Dialog
          title="公司成立统计"
          width="1100px"
          visible={visible}
          appendToBody
          {...{
            on: {
              'update:visible': (v: boolean) => {
                this.visible = v
              }
            }
          }}
        >
          <div vLoading={chartLoading} style="margin: -20px -20px 20px;">
            <div ref="chartRef" style="height: 400px;" />
          </div>
          <div class="tip-text" style="padding-left: 20px;">
            Tips: 本图表为对应列表筛选后的公司成立统计分布：x轴 -
            公司成立时间，y轴 - 公司成立数量
          </div>
        </Dialog>
      </div>
    )
  }
})

function useChart(getDownloadPostData: () => any) {
  const visible = ref(false)
  const chartLoading = ref(false)
  const chartRef = ref<HTMLDivElement | null>(null)
  let prevChartPostData = ''

  const handleOpenChartDialog = async () => {
    visible.value = true
    const _lqs = location.href.split('?')[1]
    if (_lqs === prevChartPostData) {
      return
    }
    prevChartPostData = _lqs

    try {
      chartLoading.value = true
      const postData = getDownloadPostData()
      const res = await postCompanyListChart({ ...postData, agg: true })
      const yearData = getYearOptions(postData.year as string[])
      const yearOptions = yearData.options
      const hasBeforeYear = yearData.hasBeforeYear
      const chartData = res.data

      if (!hasBeforeYear && yearOptions.length === 1) {
        // 处理单年的数据
        chartData.forEach((item) => {
          item.label = `${yearOptions[0]}-${item.label}`
        })
      }

      await nextTick()
      __drawChart(
        chartRef.value!,
        chartData.map((_) => _.label),
        chartData.map((_) => _.count)
      )
      chartLoading.value = false
    } catch (e) {
      console.error(e)
    }
  }

  return {
    visible,
    chartLoading,
    chartRef,
    handleOpenChartDialog
  }
}

function __drawChart(el: HTMLDivElement, labels: string[], values: number[]) {
  // @ts-ignore
  const charts = echarts.init(el)
  charts.setOption({
    grid: {
      left: '70px',
      right: '30px',
      bottom: '70px'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: [
      {
        type: 'category',
        data: labels,
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        },
        axisLabel: {
          color: 'rgba(51, 51, 51, 1)',
          fontSize: 12,
          interval: 0,
          rotate: 40,
          padding: [10, 0, 0, 0]
        }
      }
    ],
    yAxis: [
      {
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['rgba(243, 243, 243, 1)', 'rgba(255, 255, 255, 1)']
          }
        },
        type: 'value',
        name: '成立数量',
        nameTextStyle: {
          padding: [0, 40, 10, 0],
          color: 'rgba(204, 204, 204, 1)',
          fontSize: 12
        },
        axisLabel: {
          color: 'rgba(153, 153, 153, 1)',
          fontSize: 12
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(230, 230, 230, 1)'
          }
        }
      }
    ],
    series: [
      {
        name: '公司成立数量',
        type: 'bar',
        data: values,
        barWidth: '25px',
        itemStyle: {
          color: 'rgba(255, 136, 102, 1)',
          borderColor: 'rgba(254, 80, 122, 1)',
          borderWidth: 2,
          barBorderRadius: [3, 3, 0, 0]
        }
      }
    ]
  })
}
