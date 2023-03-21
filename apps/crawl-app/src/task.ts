import pLimit from 'p-limit'
import { $Env } from './utils/env.js'
import { getQJWAllList, parseBDXW } from './fetch/home.js'
import { IGNORE_LIST } from './config/ignore.js'
import { app as logger } from './config/logger.js'
import { getExistedRecords } from './dao/records.js'
import { getQJWListPost, getArticleList, getBDXYPost } from './fetch/list.js'
import { COMMIT_EMITTER, COMMIT_EVENTS } from './events/commits.js'

const CONCURRENCY_NUM = parseInt($Env('CONCURRENCY_NUM'))

const QJW_URL = $Env('QJW_URL')

export const plateListTask = async () => {

  try {
    logger.info('开始爬取QJW各列表板块')

    const list = await getQJWAllList()
  
    logger.info('所有的列表页', list)
  
    const limit = pLimit(CONCURRENCY_NUM)
  
    for (const item of list) {
      const tasks: Promise<void>[] = []
      try {
        const postList = await getArticleList(item.link)
        const completedList = postList.map(item => ({ ...item, url: new URL(item.url, QJW_URL).href }))
        const existed = await getExistedRecords(completedList.map(item => item.url))
        const taskList = completedList
          .filter(item => IGNORE_LIST.every(i => !item.url.includes(i)))
          .filter(item => !existed.includes(item.url))
        logger.info(
          item.link,
          '总共:', postList.length,
          '已爬取:', existed.length,
          '待爬取:', taskList.length
        )
        tasks.push(
          ...taskList.map(task => limit(
            async () => {
              try {
                const post = await getQJWListPost(task.url, task.remark, task.updatetime)
                COMMIT_EMITTER.emit(COMMIT_EVENTS.COMMIT, { url: task.url, post })
              } catch (error) {
                logger.error(error, (error as Error).cause)
              }
            }
          ))
        )
        logger.info('tasks数量:', tasks.length)
        await Promise.all(tasks)
      } catch (error) {
        logger.error('list爬取失败', item, '\n', error)
      }
    }

    let resolve: (_?: unknown) => void

    const promise = new Promise(r => resolve = r)
  
    COMMIT_EMITTER.emit(COMMIT_EVENTS.DONE, resolve!)
  
    await promise
   
  } catch (error) {
    logger.error('QJW爬取出错', error)
  } finally {
    logger.info('QJW各列表板块爬取结束')
  }
}

export const troopNewsTask = async () => {
  try {
    logger.info('开始爬取部队新闻')
    const list = await parseBDXW()
    const existed = await getExistedRecords(list)
    const taskList = list
      .filter(item => IGNORE_LIST.every(i => !item.includes(i)))
      .filter(item => !existed.includes(item))

    const limit = pLimit(CONCURRENCY_NUM)
    const tasks: Promise<void>[] = []
    for (const link of taskList) {
      tasks.push(
        limit(
          async () => {
            try {
              const post = await getBDXYPost(link)
              COMMIT_EMITTER.emit(COMMIT_EVENTS.COMMIT, { url: link, post })
            } catch (error) {
              logger.error(error, (error as Error).cause)
            }
          }
        )
      )
    }

    await Promise.all(tasks)

    let resolve: (_?: unknown) => void

    const promise = new Promise(r => resolve = r)
  
    COMMIT_EMITTER.emit(COMMIT_EVENTS.DONE, resolve!)
  
    await promise
    
  } catch (error) {
    logger.error('爬取部队新闻出错', error)
  } finally {
    logger.info('爬取部队新闻结束')
  }
}
