const { createTextVNode } = require('@vue/runtime-core')
const Koa = require('koa')
const serve = require('koa-static')
const path = require('path')

const app = new Koa()

app.use(serve(path.resolve(__dirname, 'src')))
app.use(serve(path.resolve(__dirname, '.')))


app.use((ctx) => {
  if (ctx.request.url === '/api/list') {
    ctx.body = {
      code: 200,
      data: [12312,1242141,25251251212]
    }
  }
})

app.listen(3000)