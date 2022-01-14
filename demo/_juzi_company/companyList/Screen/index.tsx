import { defineComponent, PropType, toRefs } from '@vue/composition-api'
import { Tooltip } from 'element-ui'
import Space from '@/components/global/Space/index.tsx'
import Screen from '@/components/global/Screen/Screen'
import ScreenItem from '@/components/global/Screen/ScreenItem'
import ScopeScreen from '@/components/global/Screen/Scope'
import AddressScreen from '@/components/global/Screen/Address'
import openLoginModal from '@/components/global/Modal/Login'
import { CheckboxOptionsGroup } from '@/components/global/Screen/Checkbox'
import {
  RadioGroup,
  AllRadio,
  Radio,
  RadioOptionsGroup
} from '@/components/global/Screen/Radio'
import Selected from '@/components/global/Screen/Selected'
import { UPDATE_MODEL_EVENT } from '@/utils'
import { useListSelectTag, useListKeywords } from '@/composables'
import { useOptions, useSelected, useSaveScreen } from '../hook'
import { CompanyScreenValues } from './interface'

type Values = CompanyScreenValues

export default defineComponent({
  name: 'CompanyScreen',
  props: {
    value: {
      type: Object as PropType<CompanyScreenValues>,
      default: () => ({})
    }
  },
  emits: [UPDATE_MODEL_EVENT],
  setup(props, { emit }) {
    const optionsOptions = useOptions()

    // @ts-ignore: bug
    // see: https://github.com/vuejs/composition-api/commit/7284ad971317bc7520c7ea09c4e69b7baad45d06#diff-dfae2c835ae3f8200132ff3b9d4785666f9951d561422c595ecddd882be5aa68
    const values = toRefs<Values>(props.value)

    const createEmitChange = <K extends keyof Values>(
      key: K,
      value: CompanyScreenValues[K]
    ) => {
      emit(UPDATE_MODEL_EVENT, { [key]: value })
    }

    return {
      ...optionsOptions,
      ...useListKeywords(values.keyword, createEmitChange),
      ...useListSelectTag(createEmitChange),
      ...useSelected({
        ...values,
        ...optionsOptions
      }),
      ...useSaveScreen(values, emit),
      cmc: <K extends keyof Values>(key: K) => (val: Values[K]) =>
        createEmitChange(key, val)
    }
  },
  render() {
    const {
      // model value
      value: model,

      // state
      loading,
      saveScreenLoading,

      // options
      tagOptions,
      roundOptions,
      dateOptions,
      fdOptions,
      stateOptions,
      selectedOptions,
      selectedComputed,

      // events
      cmc: createModelChangeEvent,
      handleKeywordEnter,
      handleTagSelectChange,
      remoteMethod,
      handleAddSaveScreenOptions,
      createSaveScreenDialog,
      handleSelectedClearAll
    } = this

    return (
      <Screen labelWidth="80px">
        <ScreenItem label="搜索">
          <div class="d-flex justify-content-between">
            <Space direction="horizontal" size="large">
              <Space direction="horizontal" size="mini">
                <Tooltip placement="top" content="可任意搜索多个关键词">
                  <i class="el-icon-info" />
                </Tooltip>
                <el-input
                  vModel={this.keyword}
                  placeholder="输入关键词，按回车键确认"
                  style="width: 220px;"
                  {...{
                    nativeOn: {
                      keydown: handleKeywordEnter
                    }
                  }}
                />
              </Space>
              <Space direction="horizontal" size="mini">
                <span class="title-text">标签:</span>
                <Tooltip
                  placement="top"
                  content="仅支持单一选择桔子数据库的标签"
                >
                  <i class="el-icon-info" />
                </Tooltip>
                <el-select
                  value=""
                  onChange={handleTagSelectChange}
                  filterable
                  remote
                  reserve-keyword
                  placeholder="输入关键词，选择标签"
                  style="width: 220px;"
                  remote-method={remoteMethod}
                  loading={loading}
                >
                  {tagOptions.map((item) => (
                    <el-option
                      key={item.id}
                      label={item.name}
                      value={item.id}
                    />
                  ))}
                </el-select>
              </Space>
            </Space>
            <Space direction="horizontal" size="mini">
              {selectedComputed.length > 0 && (
                <el-button
                  loading={saveScreenLoading}
                  round
                  size="mini"
                  onClick={() => handleAddSaveScreenOptions()}
                >
                  保存筛选
                </el-button>
              )}
              <div
                onClick={() => {
                  createSaveScreenDialog(this.saveScreenChanged)
                  this.saveScreenChanged = false
                }}
                class="primary-text cursor-pointer"
              >
                使用已保存的筛选
              </div>
            </Space>
          </div>
        </ScreenItem>
        <ScreenItem label="行业">
          <ScopeScreen
            value={model.scope}
            onChange={createModelChangeEvent('scope')}
          />
        </ScreenItem>
        <ScreenItem label="轮次">
          <CheckboxOptionsGroup
            value={model.round}
            onChange={createModelChangeEvent('round')}
            options={roundOptions}
          />
        </ScreenItem>
        <ScreenItem label="地区">
          <AddressScreen
            value={model.address}
            onChange={createModelChangeEvent('address')}
          />
        </ScreenItem>
        <ScreenItem label="成立时间">
          <CheckboxOptionsGroup
            value={model.date}
            onChange={createModelChangeEvent('date')}
            options={dateOptions}
          />
        </ScreenItem>
        <ScreenItem label="融资需求">
          <RadioOptionsGroup
            value={model.fd}
            onChange={createModelChangeEvent('fd')}
            options={fdOptions}
          />
        </ScreenItem>
        <ScreenItem label="状态">
          <RadioOptionsGroup
            value={model.state}
            onChange={createModelChangeEvent('state')}
            options={stateOptions}
          />
        </ScreenItem>
        <ScreenItem label="桔子优选">
          <RadioGroup
            value={model.selected}
            onChange={(value: CompanyScreenValues['selected']) => {
              if (!this.$store.getters.login) {
                openLoginModal()
              } else {
                createModelChangeEvent('selected')(value)
              }
            }}
            type="primary"
          >
            <AllRadio />
            {selectedOptions.map((item, index) => (
              <Radio
                key={index + 1}
                label={item.name}
                vip={item.vip}
                {...{
                  props: {
                    tooltipOptions: item.tooltip
                      ? {
                          content: item.tooltip()
                        }
                      : undefined
                  }
                }}
              >
                {item.name}
              </Radio>
            ))}
          </RadioGroup>
        </ScreenItem>
        {selectedComputed.length > 0 && (
          <ScreenItem label="所有筛选">
            <Selected
              options={selectedComputed}
              onChange={({
                key,
                value
              }: {
                key: keyof CompanyScreenValues
                value: any
              }) => {
                createModelChangeEvent(key)(value)
              }}
              onClearAll={() => {
                handleSelectedClearAll((values) => {
                  this.$emit(UPDATE_MODEL_EVENT, values)
                })
              }}
            />
          </ScreenItem>
        )}
      </Screen>
    )
  }
})
