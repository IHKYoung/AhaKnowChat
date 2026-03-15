// scripts/start.js

const { execSync } = require('child_process')
const { checkBuildExists } = require('./check-build.js')
const dotenv = require('dotenv')

dotenv.config()

console.log('Starting AhaKnow...')

if (!checkBuildExists()) {
  console.log('Build output not found. Building...')
  try {
    execSync('tsc && node scripts/build-electron.js && vite build', { stdio: 'inherit' })
    console.log('Build complete.')
  } catch (error) {
    console.error('Build failed:', error.message)
    process.exit(1)
  }
} else {
  console.log('Build output found.')
}

console.log('Launching Electron...')
try {
  execSync('electron .', { stdio: 'inherit' })
} catch (error) {
  console.error('Launch failed:', error.message)
  process.exit(1)
}
