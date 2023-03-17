import { $Env } from '../utils/env.js'
import type { Connection } from 'dmdb'
import type { PoolConnection } from 'mysql2/promise'
import type { RecordEntity } from '../types/entity.js'


const CURRENT_DB = $Env('CURRENT_DB', ['mysql', 'dmdb'])

type InsertManyNews = (entities: RecordEntity[], connection: Connection | PoolConnection) => Promise<void>

type GetExistedRecords = (urls: string[]) => Promise<string[]>

const m = await import(`./${CURRENT_DB}/records.js`)

export const insertManyRecords = m.insertManyRecords as InsertManyNews

export const getExistedRecords = m.getExistedRecords as GetExistedRecords
