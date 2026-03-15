// scripts/build-electron.js

const { spawnSync } = require('child_process')
const path = require('path')

const getTscBin = () => {
  const binName = process.platform === 'win32' ? 'tsc.cmd' : 'tsc'
  return path.resolve(__dirname, '../node_modules/.bin', binName)
}

const buildElectron = () => {
  const args = ['-p', path.resolve(__dirname, '../tsconfig.electron.json')]
  if (process.argv.includes('--watch')) {
    args.push('--watch', '--preserveWatchOutput')
  }

  console.log('Building Electron process...')

  const result = spawnSync(getTscBin(), args, { stdio: 'inherit' })
  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }

  if (!process.argv.includes('--watch')) {
    console.log('Electron build complete.')
  }
}

buildElectron()
