module.exports = {
  '/sdata': {
    target: process.env.SD_PROXY_URL,
    changeOrigin: true,
  },
}