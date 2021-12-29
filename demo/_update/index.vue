<template>
  <div class="upload-wrap">
    <div class="upload-title text-center">
      分享报告
    </div>

    <div class="upload-text">
      <p>1、您将获得奖励，每份上传的报告在审核通过后，桔子币<span class="col">+2</span> ，您的报告每被用户下载，桔子币<span class="col">+1</span>。桔子币可用于下载报告、公司、融资事件等数据。</p>
      <p>2、为确保内容质量，上传报告会经过人工审核，为提高报告的审核通过率，请确保上传的内容没有政治, 色情, 暴力等内容，去除文件名中的特殊字符及空格，删除报告内的二维码等广告。</p>
    </div>

    <el-form
      :model="fileData"
      :rules="rules"
      label-width="100px"
      style="margin-top:40px;"
    >
      <el-form-item
        label="报告标签:"
        style="margin-bottom:35px;"
      >
        <el-select
          v-model="fileData.scope"
          @change="handleScopeChange"
          placeholder="小贴士: 为您的报告添加标签，可极大地提高曝光率"
          size="mini"
          style="width:100%;"
        >
          <el-option
            v-for="item in scopeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="上传文件:">
        <div
          class="upload-box"
          style="margin-bottom:15px"
        >
          <Upload
            :headers="{'X-Requested-With': 'XMLHttpRequest','Authorization': this.$store.getters.token}"
            :before-upload="beforeAvatarUpload"
            :data="fileData"
            :file-list="fileList"
            :show-file-list="false"
            v-model="file"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            drag
            multiple
            class="upload-box__entry"
          />

          <div class="upload-desc letter-space text-center">
            <p>
              <i class="el-icon-upload upload-desc__icon" />
              点击或将文件拖拽到这里上传,支持多文件上传
            </p>
            <p>
              注：支持的文件类型 .pdf/.ppt/.pptx/.doc/.docx/.key/.zip/.rar<br>
              (单个文件大小不超过50M)
            </p>
          </div>

          <div class="upload-show letter-space">
            <div
              v-if="!fileList.length"
              class="upload-show__none"
            >
              - 暂无上传文件 -
            </div>

            <div
              v-for="item of fileList"
              :key="item.uid"
              class="upload-show__list"
            >
              <div
                @click="handlePreview"
                class="upload-show__item"
              >
                <i class="el-icon-document upload-show__item-icon" />
                <span class="upload-show__item--name">{{ item.name }}</span>
                <span class="upload-show__item--size">{{ item.size | filesize }}</span>
                <template v-if="item.listName === 'nameList'">
                  <span
                    v-if="!item.percentage && !item.response"
                    class="item-status"
                  >
                    待上传
                  </span>

                  <span
                    v-else-if="!item.response"
                    class="item-status item-gress report-upload-progress"
                  >
                    <el-progress
                      :percentage="item.percentage | rounding"
                      color="ff8866"
                    />
                  </span>

                  <span
                    v-else
                    class="item-status item-up__success"
                  >
                    上传成功
                  </span>
                </template>

                <template v-else-if="item.listName === 'errList'">
                  <span class="item-status item-up__error">{{ item.mes }}</span>
                </template>

                <span
                  @click="handleRemove"
                  class="item-file__icon--close"
                >
                  删除
                </span>
              </div>
            </div>
          </div>

        </div>
        <div class="text-center">
          <el-button
            @click="selectFiles"
            size="small"
          >
            选取文件
          </el-button>
          <el-button
            :disabled="isDisable"
            @click="newSubmitForm"
            type="primary"
            size="small"
          >
            上传文件
          </el-button>
        </div>
      </el-form-item>
    </el-form>

    <el-dialog
      v-if="dialogVisible"
      :close-on-click-modal="false"
      title="分享报告"
      width="30%"
    >
      <div>
        <p class="upload-dialog">
          感谢您对IT桔子做出的贡献，
          本次您成功上传了<span>{{ nameList.length }}</span>篇报告，
          失败<span>{{ errorList.length }}</span>篇
          <template v-if="nameList.length">
            ，
            上传报告将会在单个工作日内进行审核，审核状态可在
            <a
              href="/user-center/download#report_up"
              style="color:#f86"
            >【个人中心】</a>
            查看。
          </template>
        </p>
      </div>
      <div
        slot="footer"
        style="text-align:center"
      >
        <router-link
          to="/report"
          tag="el-button"
        >返回报告页</router-link>
        <el-button
          @click="dialogVisible = false"
          type="primary"
        >继续上传</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { Upload } from 'element-ui'
// @ts-ignore
import { useScopeScreen } from '@/composables'
import { ALL_KEY } from '@/utils'

export default defineComponent({
  name: 'ReportUpload',
  meta: {
    breadcrumb: ['报告'],
  },
  components: {
    Upload,
  },
  data() {
    return {
      fileData: {
        scope: '',
      },
      fileList: [
        {
          name: 'food.jpeg',
        },
        {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
      ],

      nameList: [],
      errorList: [],
      dialogVisible: false,
      rules: {
        scope: [{ required: true, message: '请选择报告标签', trigger: 'blur' }],
      },
    }
  },
  methods: {
    beforeAvatarUpload(size: any) {
      return this.fileData.scope !== '' && size / 1024 / 1024 < 50
    },
    selectFiles() {},
    delItem(index: any, listName: any) {
      console.log(index, listName, 'delItem')
    },
    handleChange() {
      // @ts-ignore
      this.nameList = this.fileList
    },
    handleRemove(file: any, fileList: any) {
      console.log(file, fileList)
    },
    handlePreview(file: any) {
      console.log(file)
    },
  },
  setup() {
    // 已选择的类别
    const { options: _scopeOptions } = useScopeScreen()
    const scopeOptions = computed(() =>
      _scopeOptions.value.map((item) => ({
        ...item,
        value: item.value === ALL_KEY ? ALL_KEY : item.label,
      }))
    )
    return {
      scopeOptions,
    }
  },
})
</script>

<style lang="scss" scoped>
.letter-space {
  letter-spacing: 1px;
}
.upload-wrap {
  margin: 0 auto;
  width: 648px;

  .upload-title {
    margin-top: 55px;
    font-size: 24px;
    line-height: 32px;
  }
  .upload-text {
    margin-top: 35px;
    color: $text-color;
    line-height: 27px;

    p {
      text-indent: 2em;

      .col {
        padding: 0 15px;
        color: $primary-color;
      }
    }
  }

  .upload-desc {
    border: 1px solid $border-color;
    height: 120px;
    margin-top: -20px;

    p {
      &:first-child {
        line-height: 40px;
        font-size: $h3-size;
      }
      &:last-child {
        font-size: $tip-size;
        margin-top: 6px;
      }

      .upload-desc__icon {
        width: 34px;
        height: 34px;
        margin-right: 11px;
      }
    }
  }

  .upload-show {
    border: 1px solid $border-color;
    min-height: 250px;
    border-top: none;

    .upload-show__none {
      line-height: 250px;
      font-size: 12px;
      color: $tip-color;
      text-align: center;
    }
  }

  .upload-dialog {
    color: $tip-color;

    span,
    a {
      color: $primary-color;
    }
  }
}

::v-deep {
  .el-upload-dragger {
    position: absolute;
    top: 12px;
    width: 100%;
    height: 120px;
    opacity: 0;
    z-index: 99;

    .upload-box__entry {
      text-align: center;

      .upload-box__tip {
        margin-top: 10px;

        em {
          color: $primary-color;
        }
      }
    }
  }

  .el-upload-list {
    position: absolute;
    top: 125px;
  }
}
</style>
