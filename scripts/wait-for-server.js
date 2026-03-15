// scripts/wait-for-server.js

const http = require('http')
const dotenv = require('dotenv')

// 加载 .env 文件
dotenv.config()

function waitForServer(url, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now()
    
    function check() {
      const urlObj = new URL(url)
      const req = http.request({
        hostname: urlObj.hostname,
        port: urlObj.port,
        path: urlObj.pathname,
        method: 'GET',
        timeout: 1000
      }, (res) => {
        console.log(`✅ 服务器已启动: ${url}`)
        resolve()
      })
      
      req.on('error', () => {
        if (Date.now() - startTime > timeout) {
          reject(new Error(`超时等待服务器启动: ${url}`))
        } else {
          setTimeout(check, 500)
        }
      })
      
      req.on('timeout', () => {
        req.destroy()
        if (Date.now() - startTime > timeout) {
          reject(new Error(`超时等待服务器启动: ${url}`))
        } else {
          setTimeout(check, 500)
        }
      })
      
      req.end()
    }
    
    console.log(`🔍 等待服务器启动: ${url}`)
    check()
  })
}

// 如果直接运行此脚本
if (require.main === module) {
  const port = process.env.VITE_PORT || 20252
  const url = process.argv[2] || `http://localhost:${port}`
  waitForServer(url)
    .then(() => {
      console.log('✅ 服务器已就绪')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ 等待服务器失败:', error.message)
      process.exit(1)
    })
}

module.exports = { waitForServer }
