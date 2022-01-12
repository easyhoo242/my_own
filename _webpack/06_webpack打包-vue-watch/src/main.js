import { createApp } from 'vue/dist/vue.esm-bundler'

import App from './vue/App.vue'
import './js'

// 这两个需要安装
// vue@next
// @vue/compiler-sfc

// webpack配置loader  vue
// vue-loader-plugin   webpack插件
const app = createApp(App)

app.mount('#app')
