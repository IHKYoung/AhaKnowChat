const { execFileSync } = require('node:child_process')
const path = require('node:path')

const shouldSkipDesktopPostinstall =
  Boolean(process.env.VERCEL) ||
  process.env.AHAKNOW_SKIP_DESKTOP_POSTINSTALL === 'true'

if (shouldSkipDesktopPostinstall) {
  console.log('[postinstall] Skipping Electron desktop dependency setup in this environment.')
  process.exit(0)
}

const binaryName = process.platform === 'win32' ? 'electron-builder.cmd' : 'electron-builder'
const binaryPath = path.join(__dirname, '..', 'node_modules', '.bin', binaryName)

try {
  execFileSync(binaryPath, ['install-app-deps'], { stdio: 'inherit' })
} catch (error) {
  console.error('[postinstall] Failed to install Electron desktop dependencies.')
  throw error
}
