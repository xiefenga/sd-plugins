import schedule from 'node-schedule'
import { config } from './config/env.js'
import { app as logger } from './config/logger.js'

logger.info('配置', config)

process.on('uncaughtException', error => {
  logger.error(error)
  throw error
})

process.on('unhandledRejection', error => {
  logger.error(error)
  throw error
})

process.on('SIGINT', async () => {
  await schedule.gracefulShutdown()
  process.exit(0)
})
