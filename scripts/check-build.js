const fs = require('fs')
const path = require('path')

function checkBuildExists() {
  const distPath = path.join(__dirname, '../dist')
  const indexHtmlPath = path.join(distPath, 'index.html')
  const distElectronPath = path.join(__dirname, '../dist-electron')
  const mainPath = path.join(distElectronPath, 'main.js')
  const preloadPath = path.join(distElectronPath, 'preload.js')

  return fs.existsSync(distPath)
    && fs.existsSync(indexHtmlPath)
    && fs.existsSync(mainPath)
    && fs.existsSync(preloadPath)
}

if (require.main === module) {
  const exists = checkBuildExists()
  console.log(exists ? 'BUILD_EXISTS' : 'BUILD_NOT_EXISTS')
  process.exit(exists ? 0 : 1)
}

module.exports = { checkBuildExists }
