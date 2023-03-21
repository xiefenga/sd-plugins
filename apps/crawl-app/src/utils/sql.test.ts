import { PrepareStatement } from './sql.js'

const SQL = 'INSERT INTO "USER"."TABLE"(??) VALUES (??);'

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

const columns = Object.keys(entities[0]).concat('news_id')
const statement = new PrepareStatement(SQL)
statement.setArray(1, columns)
statement.setArrayValue(2, columns)
console.log(statement.toString())