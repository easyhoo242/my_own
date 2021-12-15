<template>
  <div class="report-home__search">
    <span class="report-home__search--label">筛选条件</span>
    <div class="report-home__select--selects d-flex flex-fill">
      <Space direction="horizontal">
        <el-select
          :value="scopeVal"
          @change="handleScopeChange"
          size="mini"
        >
          <el-option
            v-for="item in scopeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-date-picker
          :value="monthVal"
          :picker-options="pickerOptions"
          @input="handleMonthChange"
          type="monthrange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
        />
      </Space>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef } from '@vue/composition-api'
import { UPDATE_MODEL_EVENT, ALL_KEY } from '@/utils'
import Space from '@/components/global/Space/index.tsx'

export default defineComponent({
  components: {
    Space
  },
  props: {
    value: {
      type: Object as PropType<{
        scope: string
        month: (number | undefined)[]
      }>,
      required: true
    }
  },
  setup(props, { emit }) {
    const scopeOptions = [
      {
        value: ALL_KEY,
        label: '全部'
      },
      {
        value: '2',
        label: '垂直行业报告'
      },
      {
        value: '3',
        label: '投融资数据报告'
      }
    ]
    const scopeVal = toRef(props.value, 'scope')
    const monthVal = toRef(props.value, 'month')

    const createEmitChange = (key: string, value: any) => {
      emit(
        UPDATE_MODEL_EVENT,
        Object.assign(
          {
            scope: scopeVal.value,
            month: monthVal.value
          },
          { [key]: value }
        )
      )
    }

    return {
      scopeVal,
      scopeOptions,
      monthVal,
      handleScopeChange(v: string | number) {
        createEmitChange('scope', v)
      },
      handleMonthChange(v: Date[] | null) {
        createEmitChange('month', v || [])
      },
      pickerOptions: {
        disabledDate(time: Date) {
          return time.getTime() > Date.now()
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.report-home__tip {
  margin: 10px 0;
  font-size: 12px;
}

.report-home__search {
  display: flex;
  align-items: center;

  + .report-home__search {
    margin-top: 15px;
  }

  ::v-deep .el-date-editor .el-range-separator {
    width: auto;
  }
}

.report-home__search--label {
  flex: 0 0 auto;
  margin-right: 20px;
}

.report-home__search--tag {
  background: #eff3f8;
  border-radius: 2px;
  font-size: 13px;
  color: #525d7d;
  padding: 4px 8px;
  cursor: pointer;

  &:hover {
    color: $primary-color;
    background: #fff3eb;
  }
}
</style>
