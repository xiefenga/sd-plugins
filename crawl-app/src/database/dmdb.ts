import { to } from 'await-to-js'
import db, { Connection } from 'dmdb'
import { $Env } from '../utils/env.js'
import { dmdb as logger } from '../config/logger.js'

const [connErr, pool] = await to(db.createPool({
  connectString: $Env('DMDB_URL'),
  poolMin: 1,
  poolMax: 3,
}))

if (connErr) {
  const error = new Error('DMDB 连接失败', { cause: connErr })
  logger.error(error)
  throw error
}

logger.info('DMDB 连接成功')

export const getConnection = async () => {
  const [connErr, connection] = await to(pool.getConnection())
  if (connErr) {
    throw new Error('获取数据库连接失败', { cause: connErr })
  }
  return connection
}

type Action = (conn: Connection) => Promise<void>

export const beginTransaction = async (action: Action) => {
  db.autoCommit = false
  let connection
  try {
    connection = await getConnection()
    await action(connection)
    await connection.commit()
  } catch (error) {
    connection?.rollback()
    throw new Error('事务提交失败', { cause: error })
  } finally {
    connection?.close()
    db.autoCommit = true
  }
}