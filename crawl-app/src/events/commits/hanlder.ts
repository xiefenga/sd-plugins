import { to } from 'await-to-js'
import { Commit } from '../../types/entity.js'
import { insertManyNews } from '../../dao/news.js'
import { beginTransaction } from '../../database/db.js'
import { insertManyRecords } from '../../dao/records.js'
import { commit as logger } from '../../config/logger.js'
import { transformPost2NewsEntity } from '../../utils/helper.js'

const COMMIT_QUEUE: Commit[] = []

const CACHE_CAPACITY = parseInt(process.env.CACHE_CAPACITY)

export const commitEventHandler = async (commit: Commit) => {
  logger.info(`触发COMMIT事件, COMMIT_QUEUE: ${COMMIT_QUEUE.length}`)
  COMMIT_QUEUE.push(commit)
  if (COMMIT_QUEUE.length >= CACHE_CAPACITY) {
    logger.info('执行COMMIT操作')
    const commits = COMMIT_QUEUE.splice(0, CACHE_CAPACITY)
    const [transactionErr] = await to(
      beginTransaction(
        async (connection) => {
          const posts = commits.map(commit => commit.post)
          const newsEntities = posts.map(post => transformPost2NewsEntity(post))
          await insertManyNews(newsEntities, connection)
          const recordEntities = commits.map(commit => ({ crawl_url: commit.url, crawl_date: new Date() }))
          await insertManyRecords(recordEntities, connection)
        }
      )
    )
    if (transactionErr) {
      // logger.error('COMMIT操作执行失败', transactionErr, '\n cause: ', transactionErr.cause)
      logger.error('COMMIT操作执行失败', transactionErr)
    } else {
      logger.info('COMMIT操作执行成功')
    }
    logger.debug(commits)
  }
}

export const doneEvnentHandler = async (resolve: (_?: unknown) => void) => {
  logger.info(`触发DONE事件, COMMIT_QUEUE: ${COMMIT_QUEUE.length}`)
  logger.info('执行COMMIT操作')
  const commits = COMMIT_QUEUE.splice(0, CACHE_CAPACITY)
  if (commits.length === 0) {
    return
  }
  const [transactionErr] = await to(
    beginTransaction(
      async (connection) => {
        const posts = commits.map(commit => commit.post)
        const newsEntities = posts.map(post => transformPost2NewsEntity(post))
        await insertManyNews(newsEntities, connection)
        const recordEntities = commits.map(commit => ({ crawl_url: commit.url, crawl_date: new Date() }))
        await insertManyRecords(recordEntities, connection)
      }
    )
  )
  if (transactionErr) {
    logger.error('COMMIT操作执行失败', transactionErr, transactionErr.cause)
  } else {
    logger.info('COMMIT操作执行成功')
  }
  logger.debug(commits)
  resolve()
}


