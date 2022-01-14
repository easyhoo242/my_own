import { defineComponent } from 'vue'
import { companyList } from '@/api/index'

import HomeContent from './HomeContent'

console.log(companyList)

export default defineComponent({
  inheritAttrs: false,
  setup() {
    const arrList: string[] = ['dc', 'cd', 'dcc', 'cdd']

    return () => (
      <div class='container'>
        <div class='list'>
          <ul>
            {arrList.map((item, index) => {
              return <li key={index}>{item}</li>
            })}
          </ul>

          {arrList.map((item, index) => (
            <h4>{item}</h4>
          ))}
        </div>

        <HomeContent></HomeContent>
      </div>
    )
  },
})
