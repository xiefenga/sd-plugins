import fs from 'node:fs'
import { Configuration } from 'webpack-dev-server'
import { PROXY_SETUP_PATH } from '../utils/paths'

const getDevServerConfig = () => {
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
    port: 3000,
    open: true,
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