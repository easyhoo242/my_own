<template>
  <div>
    <div class="btn" @click="isShowWrap = !isShowWrap">显示/隐藏遮罩</div>

    <!-- 使用teleport的意义在于 可以需要处理的内容 放到这个div之外的body html 之中 -->
    <!-- 有时候这个需要控制显示隐藏的div是处于好几层嵌套的components之中 显示/隐藏会打乱原有布局的高度或者其他 -->
    <teleport to="body">
      <div v-if="isShowWrap" class="wrap">
        <div class="container">
          这里是内容
          <button @click="isShowWrap = false">关闭</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'teleport',
  setup() {
    const isShowWrap = ref(false)
    return {
      isShowWrap
    }
  }
}
</script>

<style scoped>
.wrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  width: 200px;
  height: 300px;
  background-color: #ff8200;
  opacity: 0.7;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
</style>
