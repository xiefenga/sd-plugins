import { $Env } from '../utils/env.js'
import type { Connection } from 'dmdb'
import type { PoolConnection } from 'mysql2/promise'

const CURRENT_DB = $Env('CURRENT_DB', ['mysql', 'dmdb'])

const { beginTransaction: transaction } = await import(`./${CURRENT_DB}.js`)

type Action = ((conn: Connection | PoolConnection) => Promise<void>)

type T = (action: Action) => Promise<void>

export const beginTransaction = transaction as T
