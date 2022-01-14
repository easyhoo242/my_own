<template>
  <div
    @click.stop
    class="company-contrast"
  >
    <div
      @click="isShow = !isShow"
      class="company-contrast__title"
    >
      比较公司({{ data.length }}/4)
    </div>
    <div v-show="isShow">
      <ul
        v-if="data.length > 0"
        class="company-contrast__list"
      >
        <li
          v-for="item in data"
          :key="item.id"
        >
          <div class="d-flex align-items-center">
            <Avatar
              :size="40"
              :src="item.logo"
              shape="square"
              style="background: #fff"
            />
            <span>
              {{ item.name }}
            </span>
          </div>
          <i
            @click="$emit('remove', item)"
            class="el-icon-close"
          />
        </li>
      </ul>
      <Empty
        v-else
        :image-size="150"
        description="这里是空的，快去选择公司吧!"
      />
      <el-row
        :gutter="20"
        style="padding: 0 10px 15px;"
      >

        <el-col :span="12">
          <el-button
            @click="$emit('remove-all')"
            :disabled="data.length === 0"
            style="width: 100%;"
          >
            清 空
          </el-button>
        </el-col>
        <el-col :span="12">
          <A
            v-if="ids"
            :href="`/vscompany?id=${ids}`"
          >
            <el-button
              type="primary"
              style="width: 100%;"
            >
              去对比
            </el-button>
          </A>
          <el-button
            v-else
            type="primary"
            style="width: 100%;"
            disabled
          >
            去对比
          </el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  watch,
  PropType
} from '@vue/composition-api'
import { Avatar } from 'element-ui'
import Empty from '@/components/global/Empty/index.tsx'
import { NewCompanyItem } from '../type'

export default defineComponent({
  components: {
    Empty,
    Avatar
  },
  props: {
    data: {
      type: Array as PropType<NewCompanyItem[]>,
      default: () => []
    }
  },
  emits: ['remove', 'remove-all'],
  setup(props) {
    const isShow = ref(false)

    const handleToggleContrastList = () => {
      isShow.value = false
    }

    onMounted(() => {
      document.addEventListener('click', handleToggleContrastList)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleToggleContrastList)
    })

    watch(
      () => props.data,
      () => {
        isShow.value = true
      }
    )

    return {
      isShow,
      ids: computed(() =>
        encodeURIComponent(props.data.map((_) => _.id).join(','))
      )
    }
  }
})
</script>

<style lang="scss" scoped>
.company-contrast {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 250px;
  background-color: $white;
  box-shadow: 0px 2px 10px 0px rgb(0 0 0 / 6%);
}

.company-contrast__title {
  padding: 10px;
  background-color: $primary-color;
  color: $white;
  text-align: center;
  cursor: pointer;
}

.company-contrast__list {
  padding: 10px;

  li {
    display: flex;
    align-items: center;
    padding: 5px;
    justify-content: space-between;
    border-bottom: 1px solid $border-color;

    span {
      margin-left: 15px;
    }

    i {
      cursor: pointer;

      &:hover {
        color: $primary-color;
      }
    }
  }
}
</style>
