import { to } from 'await-to-js'
import type { Connection } from 'dmdb'
import { randomUUID } from 'node:crypto'
import { $Env } from '../../utils/env.js'
import { NewsEntity } from '../../types/entity.js'
import { PrepareStatement } from '../../utils/sql.js'
import { dmdb as logger } from '../../config/logger.js'

const [user, table] = $Env('NEWS_TABLE').split('.')

const SQL = `INSERT INTO "${user}"."${table}"(??) VALUES (??);`

export const insertManyNews = async (
  entities: NewsEntity[],
  connection: Connection
) => {
  const columns = Object.keys(entities[0]).concat('news_id')
  const statement = new PrepareStatement(SQL)
  statement.setArray(1, columns)
  statement.setArrayValue(2, columns)
  const sql = statement.toString()
 
  const binds = entities.map(entity => ({ news_id: randomUUID(), ...entity }))
  const [execErr, result] = await to(connection.executeMany(sql, binds))
  
  if (execErr) {
    throw new Error(`SQL执行出错: ${sql}`, { cause: execErr })
  }
  logger.info('插入新闻', 'insert:', entities.length, 'affected:', result.rowsAffected)
}
