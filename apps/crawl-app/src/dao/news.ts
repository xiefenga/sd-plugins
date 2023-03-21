import { $Env } from '../utils/env.js'
import type { Connection } from 'dmdb'
import type { PoolConnection } from 'mysql2/promise'
import type { NewsEntity } from '../types/entity.js'

const CURRENT_DB = $Env('CURRENT_DB', ['mysql', 'dmdb'])

type InsertManyNews = (entities: NewsEntity[], connection: Connection | PoolConnection) => Promise<void>

const m = await import(`./${CURRENT_DB}/news.js`)

export const insertManyNews = m.insertManyNews as InsertManyNews

