import '../init.js'
import { beginTransaction } from './db.js'
import { insertManyNews } from '../dao/news.js'
import { insertManyRecords } from '../dao/records.js'

const newsEntities = [
  {
    news_title: 'string',
    news_source: 'string',
    news_publish_time: '2022-02-10',
    news_author: 'string',
    news_text: 'string',
    news_abstract: 'string',
  
    news_browse_setting: 0,
    comment_setting: 0,
    news_secrecy: 0,
    user_id: 'string',
    news_publish_state: 0,
    business_status: 'string',
    news_column: '',
    news_tag: '',
  },
]

const recordEntities = [
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

console.log('start')
await beginTransaction(
  async (connection) => {
    await insertManyNews(newsEntities, connection)
    await insertManyRecords(recordEntities, connection)
  }
)
console.log('end')
