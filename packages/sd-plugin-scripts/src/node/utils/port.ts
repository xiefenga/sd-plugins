import portfinder from 'portfinder'

portfinder.setBasePort(3000)

export const choosePort = async () => {
  return await portfinder.getPortPromise()
}