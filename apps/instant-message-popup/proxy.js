/* eslint-env node  */

module.exports = {
  '/sdata/rest/': {
    target: process.env.SD_PROXY_URL,
    changeOrigin: true,
  },
}