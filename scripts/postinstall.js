const { resolve } = require('path')
const { execSync } = require('child_process')

// Run the postinstall script
execSync('npm run build', { stdio: 'inherit', cwd: resolve(__dirname, '../packages/sd-plugin-request') })

execSync('npm run build', { stdio: 'inherit', cwd: resolve(__dirname, '../packages/sd-dev-login') })

execSync('npm run build', { stdio: 'inherit', cwd: resolve(__dirname, '../packages/sd-plugin-scripts') })

execSync('npm run build', { stdio: 'inherit', cwd: resolve(__dirname, '../plugins/portal-index/portal-shared') })