import { createApp, defineComponent, h } from '../node_modules/vue/dist/vue.esm-browser.js'
import request from './http.js'

export const sum = (n1, n2) => n1 + n2


export const myPow = (n1, n2) => Math.pow(n1, n2)


export function getMyData () {
  return axios.get('/api/list')
}

export function getCNodeTopics () {
  return request.get(`topics`)
}

const App = defineComponent({
  template: `<ul><li v-for="item in list" :key="item">{{ item }}</li></ul>`,
  data () {
    return {
      list: []
    }
  },
  created () {
    getMyData().then(res => {
      this.list = res.data.data
    })
  }
})

export default function () {
  const app = createApp({
    render () {
      return h(App)
    }
  })
  app.mount('#app')
}