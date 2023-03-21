import path from 'node:path'

const scriptDir = path.resolve(__dirname, '..')

const resolveScript = (relative: string) => path.resolve(scriptDir, relative)

export const dotEnvPath = resolveScript('.env')

export const scriptRootDir = resolveScript('.')

export const scriptSourceDiv = resolveScript('src')

export const scriptEntry = resolveScript('src/index.tsx')

export const webpackCache = resolveScript('node_modules/.cache')

export const pkgPath = resolveScript('package.json')

export const publicPath = resolveScript('public')

export const publicHtmlPath = resolveScript('public/index.html')

export const tsConfigPath = resolveScript('tsconfig.json')

export const proxyFilePath = resolveScript('proxy.js')