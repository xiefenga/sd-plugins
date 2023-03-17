import '../init.js'
import { getConnection } from '../database/dmdb.js'
import { insertManyNews } from './news.js'

const connection = await getConnection()

const entities = [
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

console.log('插入数据 start')

await insertManyNews(entities, connection)

console.log('插入数据 end')