import '../../init.js'
import { getConnection } from '../../database/dmdb.js'
import { insertManyRecords } from './records.js'

const connection = await getConnection()

const entities = [
  {
    crawl_url: 'string',
    crawl_date: new Date(),
  },
  {
    crawl_url: 'string',
    crawl_date: new Date(),
  },
  {
    crawl_url: 'string',
    crawl_date: new Date(),
  },
  {
    crawl_url: 'string',
    crawl_date: new Date(),
  },
  {
    crawl_url: 'string',
    crawl_date: new Date(),
  },
  {
    crawl_url: 'string',
    crawl_date: new Date(),
  },
  {
    crawl_url: 'string',
    crawl_date: new Date(),
  },
  {
    crawl_url: 'string',
    crawl_date: new Date(),
  },
  {
    crawl_url: 'string',
    crawl_date: new Date(),
  },
  {
    crawl_url: 'string',
    crawl_date: new Date(),
  },
  {
    crawl_url: 'string',
    crawl_date: new Date(),
  },
  {
    crawl_url: 'string',
    crawl_date: new Date(),
  },
  {
    crawl_url: 'string',
    crawl_date: new Date(),
  },
  {
    crawl_url: 'string',
    crawl_date: new Date(),
  },
  {
    crawl_url: 'string',
    crawl_date: new Date(),
  },
  {
    crawl_url: 'string',
    crawl_date: new Date(),
  },
  {
    crawl_url: 'string',
    crawl_date: new Date(),
  },
  {
    crawl_url: 'string',
    crawl_date: new Date(),
  },
  {
    crawl_url: 'string',
    crawl_date: new Date(),
  },
]

console.log('插入数据 start')

await insertManyRecords(entities, connection)

console.log('插入数据 end')
