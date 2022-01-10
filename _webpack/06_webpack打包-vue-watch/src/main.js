// webpack的话这里必须选择以下的版本 否则不会编译
import { createApp } from 'vue/dist/vue.esm-bundler'
import axios from 'axios'

import App from './vue/App.vue'
import './js/element'
import './js/other(from_main)'


// 这两个需要安装
// vue@next
// @vue/compiler-sfc

// webpack配置loader  vue
// vue-loader-plugin   webpack插件
const app = createApp(App)


app.mount('#app')


axios.get()