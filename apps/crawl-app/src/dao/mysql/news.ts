import { randomUUID } from 'node:crypto'
import { PoolConnection, ResultSetHeader } from 'mysql2/promise'

import { $Env } from '../../utils/env.js'
import { NewsEntity } from '../../types/entity.js'
import { mysql as logger } from '../../config/logger.js'

const NEWS_TABLE = $Env('NEWS_TABLE')

const SQL = `INSERT INTO ${NEWS_TABLE} (??) VALUES ?;`

export const insertManyNews = async (
  entities: NewsEntity[],
  connection: PoolConnection
) => {
  if (entities.length) { 
    const binds = entities.map(entity => ({ news_id: randomUUID(), ...entity }))
    const columns = Object.keys(binds[0])
    const values = binds.map(obj => Object.values(obj))
    try {
      logger.info(connection.format(SQL, [columns, values]))
      const [result] = await connection.query<ResultSetHeader>(SQL, [columns, values])
      logger.info('插入新闻', 'insert:', entities.length, 'affected:', result.affectedRows)
    } catch (error) {
      throw new Error('SQL执行出错', { cause: error })
    }
  }
}
