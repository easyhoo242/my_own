<template>
  <div>
    <div class="access_record-header text-center">
      <h2>访问记录</h2>
    </div>

    <div class="access_record-content">
      <el-select
        size="small"
        v-model="selection"
        placeholder="我的记录"
        @change="selectChange(selection)"
      >
        <el-option
          v-for="item in selectList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <div class="access_record-table__wrap">
        <el-table :data="tableData" border header-row-class-name="table-header">
          <el-table-column
            label="时间"
            prop="time"
            width="150"
            align="center"
          />
          <el-table-column
            label="描述"
            prop="desc"
            align="left"
            style="padding-left:20px;"
          />
        </el-table>
      </div>
    </div>

    <div class="text-right" style="margin-top:15px;">
      <el-pagination
        background
        @current-change="pageChangeCompany"
        :current-page.sync="currentPage"
        :page-size="5"
        layout="prev, pager, next"
        :total="tableData.data.page.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { Select as elSelect } from 'element-ui'
import dayjs from 'dayjs'
import userAccessRecord from './list'
import { getUserRecord } from '@/api/userCenter'

export default defineComponent({
  components: {
    elSelect
  },
  setup() {
    const selection = ref('')
    const selectList = [
      {
        value: 1,
        label: '我的记录'
      },
      {
        value: 2,
        label: '企业子账号记录'
      }
    ]

    const selectChange = (selection) => {
      console.log(selection)
    }

    const tableData = ref([])
    const currentPage = ref(1)

    const pageChangeCompany = (index) => {
      console.log(index)
    }

    getUserRecord().then((res) => {
      tableData.value = res.data.info.map((res) => ({
        id: res.operation_id,
        time: dayjs(res.operation_time * 1000).format('YYYY年MM月DD日'),
        desc: res.operation_content
      }))
    })

    return {
      selection,
      selectList,
      tableData,
      userAccessRecord,

      selectChange,
      pageChangeCompany
    }
  }
})
</script>

<style lang="scss" scoped>
.access_record-header {
  h2 {
    padding: 30px 0;
    margin-bottom: 15px;
    border-bottom: 1px solid #e4e7ed;
  }
}

.access_record-table__wrap {
  margin-top: 15px;
}
</style>
