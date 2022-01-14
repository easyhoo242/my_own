import { defineComponent } from 'vue'

export default defineComponent({
  inheritAttrs: false,
  render() {
    const arrList: string[] = ['dc', 'cd', 'cdd', 'dcc']

    return (
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
      </div>
    )
  },
})
