<template>
  <div class="report-origin-list">
    <div>共<span class="primary-text">{{ total }}</span>篇报告</div>
    <div class="report-origin-list__box">
      <div
        v-for="item in data"
        :key="item.id"
        class="report-origin-list__item d-flex"
      >
        <div class="item-logo flex-0 d-flex align-items-center">
          <img
            :src="item.logo"
            alt=""
          >
        </div>

        <div class="item-content flex-fill d-flex flex-column justify-content-between">
          <div class="item-content__title d-flex justify-content-between">
            <h3 class="item-content__title-text flex-fill text-truncate">
              <A :href="item.cdn_url">
                {{ item.name }}
              </A>
            </h3>

            <div class="item-content__title-tip flex-0 text-right">
              2021年11月04日
            </div>
          </div>

          <div class="item-content__text flex-0">
            {{ item.des }}
          </div>

          <div class="item-footer flex-0 d-flex justify-content-between align-items-end">
            <div class="item-footer__tips">
              <Tag
                v-if="!item.price"
                type="primary"
                effect="dark"
                size="mini"
              >
                免费
              </Tag>

              <Tag
                v-else
                type="primary"
                effect="dark"
                size="mini"
              >
                {{ '¥' + item.price }}
              </Tag>

              <Tag
                type="primary"
                effect="plain"
                size="mini"
              >
                {{ item.type }}
              </Tag>

            </div>
            <div class="item-footer__download">
              <A
                v-if="item.price"
                :href="item.shop_url"
              >
                <el-button
                  type="primary"
                  size="mini"
                  style="padding:6px 17px; margin-right:20px"
                >下载</el-button>
              </A>
              <A
                v-else
                :href="item.cdn_url"
              >
                <el-button
                  type="primary"
                  size="mini"
                  style="padding:6px 17px; margin-right:20px"
                >下载</el-button>
              </A>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { Tag } from 'element-ui'

export default defineComponent({
  props: {
    total: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Tag
  }
})
</script>

<style lang="scss" scoped>
.report-origin-list__item {
  padding: 10px 0;
  border-bottom: 1px solid $border-color;

  .item-logo {
    width: 82px;
    margin-right: 15px;

    img {
      width: 100%;
    }
  }

  .item-content {
    margin-right: 15px;
    padding: 7px 0;

    .item-content__title-text {
      color: $title-color;
      font-weight: 700;
    }

    .item-content__title-tip {
      width: 170px;
      color: $tip-color;
    }

    .item-content__text {
      color: $tip-color;
      padding-right: 145px;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
}
</style>
