import { defineComponent, ref } from 'vue'
import { getComList } from '@/api'

const asyncData = async () => {
  return (await getComList()).data
}

export default defineComponent({
  setup() {
    const comList = ref<any[]>([])

    asyncData().then((res) => {
      setTimeout(() => {
        comList.value = res
      }, 1000)
    })

    return () => {
      console.log(comList.value)
      return (
        <div>
          这是homeContent
          <div>
            {comList.value.map((item, index: number) => (
              <div key={index}>{item}</div>
            ))}
          </div>
          <div>123</div>
        </div>
      )
    }
  },
})
