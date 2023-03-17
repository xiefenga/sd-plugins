import { to } from 'await-to-js'
import { PoolConnection, ResultSetHeader, RowDataPacket } from 'mysql2/promise'

import { $Env } from '../../utils/env.js'
import { RecordEntity } from '../../types/entity.js'
import { getConnection } from '../../database/mysql.js'
import { mysql as logger } from '../../config/logger.js'

const RECORDS_TABLE = $Env('RECORDS_TABLE')

const INSERT_SQL = `INSERT INTO ${RECORDS_TABLE} (crawl_url, crawl_date) VALUES ?;`

type RecordValue = [url: string, date: Date]

export const insertManyRecords = async (
  entities: RecordEntity[],
  connection: PoolConnection
) => {
  if (entities.length) {
    const values = entities.map<RecordValue>(record => ([record.crawl_url, record.crawl_date]))
    try {
      const [result] = await connection.query<ResultSetHeader>(INSERT_SQL, [values])
      logger.info('插入记录', 'insert:', entities.length, 'affected:', result.affectedRows)
    } catch (error) {
      throw new Error('SQL执行出错', { cause: error })
    }
  }

}

const SELECT_SQL = `SELECT crawl_url FROM ${RECORDS_TABLE} WHERE crawl_url IN (?);`

export const getExistedRecords = async (urls: string[]): Promise<string[]> => {
  if (urls.length) {
    const connection = await getConnection()

    const [execErr, result] = await to(connection.query<RowDataPacket[]>(SELECT_SQL, [urls]))

    connection.release()
    if (execErr) {
      throw new Error(`SQL执行出错: ${SELECT_SQL}`, { cause: execErr })
    } else if (result) {
      return result[0].map(item => item.crawl_url)
    }
  }
  return []
}