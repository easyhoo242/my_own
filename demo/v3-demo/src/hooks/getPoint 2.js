import { reactive, onMounted, onUnmounted } from 'vue'

export default function () {
  const point = reactive({
    x: 0,
    y: 0
  })

  const getPoint = (e) => {
    point.x = e.pageX
    point.y = e.pageY
    console.log(e.pageX, e.pageY)
    return point
  }

  onMounted(() => {
    window.addEventListener('click', getPoint)
  })

  onUnmounted(() => {
    window.removeEventListener('click', getPoint)
  })

  return point
}