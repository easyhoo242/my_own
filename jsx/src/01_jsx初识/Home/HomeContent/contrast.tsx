import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  props: {
    comList: {
      type: Array,
      default: () => [],
    },
    arrList: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const contrastList: any = ref([])

    watch(
      props.arrList,
      () => {
        contrastList.value = props.comList.filter((res: any) =>
          new Set(props.arrList).has(res.id)
        )
      },
      {
        immediate: true,
      }
    )
    return () => (
      <div class="name-list">
        {contrastList.value.length && (
          <div class="contrast-wrap">
            {contrastList.value.map((res: any) => (
              <div class="contrast-list">
                <div class="item">
                  <div class="item-logo">
                    <img src={res.logo} alt="" />
                  </div>
                  <div class="item-content">
                    <div class="item-content__title">{res.name}</div>
                    <div class="item-content__desc">{res.type}</div>
                  </div>
                  <div
                    class="item-del"
                    onClick={(e: Event) => {
                      emit('del', res.id)
                      e.stopPropagation()
                      console.log(res.id)
                    }}
                  >
                    <span>x</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  },
})
