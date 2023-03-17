export interface ArticlePreview {
  copyfrom: string
  remark: string
  signature: string
  thumb: string
  title: string
  updatetime: string
  url: string
}

export interface Post {
  title: string
  source: string
  publish: string
  author: string
  text: string
  abstract: string
}

export interface NewsEntity {
  news_title: string
  news_source: string
  news_publish_time: string
  news_author: string
  news_text: string
  news_abstract: string
  news_column: string
  news_tag: string

  news_browse_setting: number
  comment_setting: number
  news_secrecy: number
  user_id: string
  news_publish_state: number
  business_status: string
}

export interface RecordEntity {
  crawl_url: string
  crawl_date: Date
}


export interface Commit {
  url: string
  post: Post
}