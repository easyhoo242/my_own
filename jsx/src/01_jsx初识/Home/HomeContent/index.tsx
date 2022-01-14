import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeContent',
  props: {
    thList: {
      type: Array,
      default: () => [],
    },
    comList: {
      type: Array,
      default: () => [],
    },
  },
  setup(props: any) {
    // console.log('@', props.comList)
    // console.log('@', props.thList)
    return () => {
      return (
        <div class="container">
          <div class="header">公司列表</div>
          <div class="table-wrap">
            <table cellspacing={0} cellpadding={0}>
              <tr>
                {props.thList.map((item: any, index: number) => (
                  <td style={`width:${item.width}`} key={index}>
                    {item.name}
                  </td>
                ))}
              </tr>
              {props.comList.map((item: any, index: number) => (
                <tr key={item.id}>
                  <td>
                    <div class="name-box">
                      <div class="name-box__logo">
                        <img src={item.logo} alt="" />
                      </div>
                      <div class="name-box__content">
                        <div class="name-box__content--title">
                          <a href="`javascript:;`">{item.name}</a>
                        </div>
                        <div class="name-box__content--desc">{item.type}</div>
                      </div>
                    </div>
                  </td>
                  <td>{item.city}</td>
                  <td>{item.bornTime}</td>
                  <td>{item.round}</td>
                  <td>
                    <i
                      onClick={(e: Event) => {
                        console.log(index, item.id, item.name)
                        // this.$emit('contrast', index)
                        // 阻止冒泡事件
                        e.stopPropagation()
                      }}
                    >
                      {item.scope}
                    </i>
                  </td>
                  <td>
                    <div class="tag-wrap">
                      {item.tag.map((item: any) => {
                        return (
                          <div key={item.id} class="tag-span">
                            {item.tagName}
                          </div>
                        )
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      )
    }
  },
})
