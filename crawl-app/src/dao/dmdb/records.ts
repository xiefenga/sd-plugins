import { to } from 'await-to-js'
import type { Connection } from 'dmdb'
import { $Env } from '../../utils/env.js'
import { RecordEntity } from '../../types/entity.js'
import { getConnection } from '../../database/dmdb.js'
import { dmdb as logger } from '../../config/logger.js'

const [user, table] = $Env('RECORDS_TABLE').split('.')

const INSERT_SQL = `INSERT INTO "${user}"."${table}"("crawl_url", "crawl_date") VALUES (:crawl_url, :crawl_date);`

export const insertManyRecords = async (
  entities: RecordEntity[],
  connection: Connection
) => {
  if (entities.length) {
    const binds = entities.map(record => ({ ...record }))
    const [execErr, result] = await to(connection.executeMany(INSERT_SQL, binds))
    if (execErr) {
      throw new Error('SQL执行出错', { cause: execErr })
    }
    logger.info('插入记录', 'insert:', entities.length, 'affected:', result.rowsAffected)
  }
}

export const getExistedRecords = async (urls: string[]) => {
  if (urls.length) {
    const connection = await getConnection()
    const sql = `SELECT "crawl_url" FROM "${user}"."${table}" WHERE "crawl_url" IN (${urls.map(url => `'${url}'`).join(',')});`
    const [execErr, existes] = await to(connection.execute<string[]>(sql))
    connection.close()
    if (execErr) {
      throw new Error(`SQL执行出错: ${sql}`, { cause: execErr })
    }
    return existes.rows!.map(row => row[0])
  }
  return []
}