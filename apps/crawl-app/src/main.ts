import { request } from 'undici'
import './config/env.js'
// import schedule from 'node-schedule'
import { $Env } from './utils/env.js'
// import { app as logger } from './config/logger.js'
// import { plateListTask, troopNewsTask } from './task.js'

const NEWS_COLUMN_API_URL = $Env('NEWS_COLUMN_API_URL')

request(NEWS_COLUMN_API_URL, { method: 'POST', body: JSON.stringify({})})
  .then(resp => resp.body.json())
  .then(data => data.result)
  .then(data => console.log(data))

// const onErr = (error: Error) => {
//   logger.error(error)
//   throw error
// }

// process.on('uncaughtException', onErr)

// process.on('unhandledRejection', onErr)

// process.on('SIGINT', async () => {
//   await schedule.gracefulShutdown()
//   process.exit(0)
// })

// const CRON = $Env('CRON')

// const job = schedule.scheduleJob(CRON, async () => {
//   logger.info('QJW TASK 开始')
//   await plateListTask()
//   await troopNewsTask()
//   logger.info('QJW TASK 结束')
// })

// try {
//   job.invoke()
// } catch (error) {
//   throw new Error(`CRON 配置有误: ${CRON}`, { cause: error })
// }

