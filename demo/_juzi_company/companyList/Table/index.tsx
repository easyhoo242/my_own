import { defineComponent, PropType } from '@vue/composition-api'
import { Avatar } from 'element-ui'
import dayjs from 'dayjs'
import A from '@/components/global/A/index.vue'
import SelectionTable from '@/components/global/Table/SelectionTable'
import openLoginModal from '@/components/global/Modal/Login'
import { NewCompanyItem } from '../type'

export default defineComponent({
  inheritAttrs: false,
  props: {
    data: {
      type: Array as PropType<NewCompanyItem[]>,
      default: () => []
    },
    total: {
      type: Number,
      default: 0
    },
    contrast: {
      type: Array as PropType<number[]>,
      default: () => []
    }
  },
  methods: {
    clearSelection() {
      // @ts-ignore
      this.$refs.selectionTable.clearSelection()
    }
  },
  render() {
    const { $listeners, $attrs } = this

    return (
      <div class="company-table-wrap">
        <SelectionTable
          ref="selectionTable"
          data={this.data}
          total={this.total}
          loading={$attrs.loading}
          pagination={false}
          onSelection={$listeners.selection}
        >
          <el-table-column
            label="公司名"
            min-width="280px"
            {...{
              scopedSlots: {
                default: ({ row }: { row: NewCompanyItem }) => (
                  <div class="d-flex">
                    <A href={`/company/${row.id}`} class="flex-0 mr-15">
                      <Avatar
                        shape="square"
                        size={40}
                        src={row.logo}
                        style="background: #fff"
                      />
                    </A>
                    <div class="flex-fill company-name-info">
                      <h3>
                        <A href={`/company/${row.id}`} class="title-text">
                          {row.name}
                        </A>
                        <client-only>
                          {row.has_report &&
                            (this.$store.getters.login ? (
                              <A
                                href={`/company_report/${row.id}`}
                                style="margin-left: 5px;"
                              >
                                <el-button
                                  type="warning"
                                  plain
                                  size="mini"
                                  style="padding: 4px 10px;"
                                >
                                  解读报告
                                </el-button>
                              </A>
                            ) : (
                              <el-button
                                type="warning"
                                plain
                                size="mini"
                                style="padding: 4px 10px;"
                                onClick={() => {
                                  openLoginModal()
                                }}
                              >
                                解读报告
                              </el-button>
                            ))}
                        </client-only>
                      </h3>
                      <div class="tip-text text-truncate">{row.slogan}</div>
                    </div>
                  </div>
                )
              }
            }}
          />
          <el-table-column
            label="地点"
            prop="prov"
            align="center"
            width="110px"
          />
          <el-table-column
            label="成立时间"
            align="center"
            width="110px"
            {...{
              scopedSlots: {
                default: ({ row }: { row: NewCompanyItem }) =>
                  dayjs(row.born_time * 1000).format('YYYY-MM')
              }
            }}
          />
          <el-table-column
            label="行业"
            prop="scope"
            align="center"
            width="110px"
          />
          <el-table-column
            label="融资总额"
            prop="total_money"
            align="center"
            width="150px"
            {...{
              scopedSlots: {
                default: ({ row }: { row: NewCompanyItem }) =>
                  row.total_money === 0 ? (
                    <span class="tip-text">未透露</span>
                  ) : (
                    <span>{row.total_money}</span>
                  )
              }
            }}
          />
          <el-table-column
            label="跟踪"
            align="center"
            width="60px"
            {...{
              scopedSlots: {
                default: ({ row }: { row: NewCompanyItem }) => (
                  <client-only>
                    <i
                      class={[
                        'iconfont icon-zhuizong',
                        'cursor-pointer',
                        { active: row.isTrack }
                      ]}
                      onClick={() => this.$emit('track', row)}
                    />
                  </client-only>
                )
              }
            }}
          />
          <el-table-column
            label="关注"
            align="center"
            width="60px"
            {...{
              scopedSlots: {
                default: ({ row }: { row: NewCompanyItem }) => (
                  <client-only>
                    <i
                      class={[
                        'iconfont icon-guanzhu',
                        'cursor-pointer',
                        { active: row.isFollow }
                      ]}
                      onClick={() => this.$emit('follow', row)}
                    />
                  </client-only>
                )
              }
            }}
          />
          <el-table-column
            label="对比"
            align="center"
            width="60px"
            {...{
              scopedSlots: {
                default: ({ row }: { row: NewCompanyItem }) => (
                  <client-only>
                    <i
                      class={[
                        'iconfont icon-duibi',
                        'cursor-pointer',
                        { active: this.contrast.includes(row.id) }
                      ]}
                      onClick={(ev: Event) => {
                        this.$emit('contrast', row)
                        ev.stopPropagation()
                      }}
                    />
                  </client-only>
                )
              }
            }}
          />
          <el-table-column
            label="详情"
            align="center"
            width="80px"
            {...{
              scopedSlots: {
                default: ({ row }: { row: NewCompanyItem }) => (
                  <A href={`/company/${row.id}`}>
                    <el-button type="info">详情</el-button>
                  </A>
                )
              }
            }}
          />
        </SelectionTable>
      </div>
    )
  }
})
