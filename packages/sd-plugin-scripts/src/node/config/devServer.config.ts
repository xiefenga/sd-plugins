import fs from 'node:fs'
import { Configuration } from 'webpack-dev-server'
import { PROXY_SETUP_PATH } from './paths'


// todo: 
//  1. proxy 文件支持多种格式, json, js, ts
//  2. proxy 文件更改自动应用
//  3. 智能打开浏览器

const getDevServerConfig = (port = 3000) => {

  const proxy = fs.existsSync(PROXY_SETUP_PATH)
    ? require(PROXY_SETUP_PATH)
    : {}

  const devServerConfig: Configuration = {
    proxy,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    },
    compress: true,
    hot: true,
    port,
    // port: 3000,
    open: false,
  // static: {
  //   directory: paths.appPublic,
  //   publicPath: [paths.publicUrlOrPath],
  //   watch: {
  //     ignored: ignoredFiles(paths.appSrc),
  //   },
  // },
  }
  return devServerConfig
}

export default getDevServerConfig