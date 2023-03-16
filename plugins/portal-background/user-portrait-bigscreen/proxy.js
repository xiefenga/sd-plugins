module.exports = {
  '/sdata': {
    target: process.env.SD_PROXY_URL,
    changeOrigin: true,
  },
  '/storage_area': {
    target: process.env.SD_PROXY_URL,
    changeOrigin: true,
  },
}