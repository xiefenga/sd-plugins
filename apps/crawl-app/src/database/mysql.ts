import { to } from 'await-to-js'
import mysql from 'mysql2/promise'
import { $Env } from '../utils/env.js'
import { mysql as logger } from '../config/logger.js'

const pool = mysql.createPool({
  uri: $Env('MYSQL_URL'),
  user: $Env('MYSQL_USER'),
  password: $Env('MYSQL_PASSWORD'),
  connectionLimit: 4,
})

const testConn = await pool.getConnection()
testConn.release()

logger.info('mysql连接成功')

export const getConnection = async () => {
  const [connErr, connection] = await to(pool.getConnection())
  if (connErr) {
    throw new Error('获取数据库连接失败', { cause: connErr })
  }
  return connection
}

type Action = (conn: mysql.PoolConnection) => Promise<void>

export const beginTransaction = async (action: Action) => {
  let connection
  try {
    connection = await getConnection()
    await connection.beginTransaction()
    await action(connection)
    await connection.commit()
  } catch (error) {
    await connection?.rollback()
    throw new Error('事务提交失败', { cause: error })
  } finally {
    connection?.release()
  }
}
