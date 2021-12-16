// process.setUncaughtExceptionCaptureCallback(e => {
//   console.error('Uncaught exception: ', e)
// })

// process.on('unhandledRejection', (reject, promise) => {
//   // reason 会传给.catch()函数拒接的理由
//   // promise是被拒绝的期约对象
// })

const https = require('https')
const { resolve } = require('path/posix')

function postJSON(host, endpoint, body, port, username, password) {

  return new Promise((resolve, reject) => {
    // 转换body对象对json
    let bodyText = JSON.stringify(body)

    // 配置https请求
    let requestOptions = {
      method: 'POST',
      host: host,
      path: endpoint,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyText)
      }
    }

    if (port) { //如果制定了端口  就在请求中使用端口
      requestOptions.port = port
    }

    if (username && password) {
      requestOptions.auth = `${username}:${password}`
    }

    let request = https.request(requestOptions)

    request.write(bodyText)
    request.end()


    request.on('error', e => reject(e))

    request.on('response', response => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP status ${response.statusCode}`))

        response.resume()

        return
      }
    })


    response.setEncoding('utf8')

    let body = ''

    response.on('data', chunk => {
      body += chunk
    })

    response.on('end', () => {
      try {
        resolve(JSON.parse(body))
      } catch (e) {
        reject(e)
      }
    })
  })
}