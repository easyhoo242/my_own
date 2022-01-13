import mitt from 'mitt'

const emitter = mitt()


// 发送
emitter.emit('event', () => {
  return {
    name: 'name',
    age: 'age'
  }
})
// 获取 监听
emitter.on('event', onFoo)

const onFoo = info => {
  console.log(info)
}
// 取消监听
emitter.off('event')

// 取消全部监听
emitter.all.clear()



export default emitter