import { defineComponent } from 'vue'
import baseLayout from '@/components/baseLayout/index.vue'

export default defineComponent({
  components: {
    baseLayout,
  },
  setup() {
    const headerMsg = '这是headerMsg'
    const defaultMsg = '这是defaultMsg'
    const footerMsg = '这是footerMsg'

    return () => (
      <div>
        <baseLayout
          {...{
            scopeSlots: {
              header: (text: string) => (
                <span>
                  {headerMsg}
                  {text}
                </span>
              ),
            },
          }}
        />
        <baseLayout
          {...{
            scopeSlots: {
              default: (message: string) => (
                <div class="">
                  <span>
                    {defaultMsg}
                    {message}
                  </span>
                </div>
              ),

              footer: (message: string) => (
                <div class="footer">
                  {footerMsg}
                  <span>{message}</span>
                </div>
              ),
            },
          }}
        />
      </div>
    )
  },
})
