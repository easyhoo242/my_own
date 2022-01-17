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
  setup(props, { attrs }) {
    const contrastList: any = ref([39263926])

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
      <div>
        <ul class={['name-list', attrs]}>
          {contrastList.value.map((res: any) => (
            <li>
              <div>
                <div class="contrast-wrap">
                  <div class="contrast-list">
                    <div class="item">
                      <div class="item-logo">
                        <img src={res.logo} alt="" />
                      </div>
                      <div class="item-content">
                        <div class="item-content__title">{res.name}</div>
                        <div class="item-content__desc">{res.type}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  },
})
