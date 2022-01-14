import { defineComponent } from 'vue'
import { companyList } from '@/api'

export default defineComponent({
  name: 'HomeContent',
  setup() {
    const thList: any[] = [
      {
        name: '名称',
        width: '100px',
      },
      {
        name: '创立时间',
        width: '100px',
      },
      {
        name: '所在城市',
        width: '100px',
      },
      {
        name: '轮次',
        width: '100px',
      },
      {
        name: '行业',
        width: '100px',
      },
      {
        name: '类型',
        width: '200px',
      },
      {
        name: '标签',
        width: '300px',
      },
    ]
    const comList: any = companyList.data.map((res) => ({
      id: res.id,
      name: res.name,
      bornTime: res.agg_born_time,
      city: res.city,
      logo: res.logo,
      month: res.month,
      round: res.round,
      scope: res.scope,
      type: res.slogan,
      tag: res.tag.map((item) => ({
        tagName: item.tag_name,
        tagId: item.tag_id,
      })),
    }))

    return () => {
      {
        comList.data
      }
      return (
        <div class="container">
          <div class="header">公司列表</div>
          <div class="table-wrap">
            <table>
              <tr>
                {thList.map((item, index: number) => (
                  <td style={`width:${item.width}`} key={index}>
                    {item.name}
                  </td>
                ))}
              </tr>
              {comList.map((item: any) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.bornTime}</td>
                  <td>{item.city}</td>
                  <td>{item.round}</td>
                  <td>{item.scope}</td>
                  <td>{item.type}</td>
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
