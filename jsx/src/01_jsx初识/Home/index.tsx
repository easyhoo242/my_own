// 模版套jsx
import { defineComponent, reactive } from 'vue'
import HomeContent from './HomeContent'

export default defineComponent({
  inheritAttrs: false,
  setup() {
    const arrList: string[] = ['aa', 'tt']
    return () => {
      return (
        <div class="container">
          <div>
            <ul class="name-list">
              {arrList.map((item, index) => {
                const uName = '你这瓜多少钱一斤呐'
                const liStyle =
                  'border-radius: 10px;font-size:12px;width:300px;margin:5px auto;'
                return (
                  <li
                    key={index}
                    class="item"
                    style={['background: #ccc', liStyle]}
                  >
                    {item + uName}
                    <br />
                    {` ${item} 瓜皮子是金子做的还是瓜粒子是金子做的 `}
                  </li>
                )
              })}
            </ul>
          </div>

          <HomeContent />
        </div>
      )
    }
  },
})
