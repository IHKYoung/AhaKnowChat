const { exec } = require('child_process')
const { promisify } = require('util')
const os = require('os')
const dotenv = require('dotenv')

dotenv.config()

const execAsync = promisify(exec)

const normalizePort = (port) => String(port).trim()

const getCommand = (platform, port) => {
  if (platform === 'win32') {
    return `netstat -ano | findstr :${port}`
  }

  return `lsof -tiTCP:${port} -sTCP:LISTEN -nP`
}

const getErrorCode = (error) => {
  if (!error || typeof error !== 'object') return undefined
  if (!('code' in error)) return undefined
  return error.code
}

const getErrorMessage = (error) => {
  return error instanceof Error ? error.message : String(error)
}

const isNoMatchError = (error, platform) => {
  const code = getErrorCode(error)
  if (platform === 'win32') {
    return code === 1
  }
  return code === 1
}

async function killPort(port) {
  try {
    const platform = os.platform()
    const normalizedPort = normalizePort(port)
    const command = getCommand(platform, normalizedPort)

    console.log(`Checking port ${normalizedPort}...`)

    const { stdout } = await execAsync(command)

    if (stdout.trim()) {
      console.log(`Port ${normalizedPort} is in use. Terminating process...`)

      if (platform === 'win32') {
        const lines = stdout.trim().split('\n')
        const pids = new Set()

        lines.forEach(line => {
          const parts = line.trim().split(/\s+/)
          if (parts.length >= 5) {
            const pid = parts[parts.length - 1]
            if (pid && pid !== '0') {
              pids.add(pid)
            }
          }
        })

        for (const pid of pids) {
          try {
            console.log(`Terminating PID: ${pid}`)
            await execAsync(`taskkill /PID ${pid} /F`)
            console.log(`PID ${pid} terminated.`)
          } catch (error) {
            console.log(`Failed to terminate PID ${pid}: ${getErrorMessage(error)}`)
          }
        }
      } else {
        const pids = stdout.trim().split('\n')
        for (const pid of pids) {
          if (pid) {
            try {
              console.log(`Terminating PID: ${pid}`)
              await execAsync(`kill -9 ${pid}`)
              console.log(`PID ${pid} terminated.`)
            } catch (error) {
              console.log(`Failed to terminate PID ${pid}: ${getErrorMessage(error)}`)
            }
          }
        }
      }

      await new Promise(resolve => setTimeout(resolve, 1000))

      console.log(`Port ${normalizedPort} released.`)
    } else {
      console.log(`Port ${normalizedPort} is free.`)
    }
  } catch (error) {
    const platform = os.platform()
    const normalizedPort = normalizePort(port)

    if (isNoMatchError(error, platform)) {
      console.log(`Port ${normalizedPort} is free.`)
      return
    }

    console.log(`Port ${normalizedPort} check failed: ${getErrorMessage(error)}`)
  }
}

if (require.main === module) {
  const port = process.argv[2] || process.env.VITE_PORT || 20252
  killPort(port)
}

module.exports = { killPort }
