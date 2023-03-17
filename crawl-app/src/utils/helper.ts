import path from 'node:path'
import * as cheerio from 'cheerio'

import { $Envs } from './env.js'
import { download } from './download.js'
import { app } from '../config/logger.js'
import { NewsEntity, Post } from '../types/entity.js'

const [DOWNLOAD_PATH, TOMCAT_ACESS_PREFIX] = $Envs('DOWNLOAD_PATH', 'TOMCAT_ACESS_PREFIX')

const [
  user_id,
  news_tag,
  news_column,
  business_status,
] = $Envs(
  'USER_ID',
  'NEWS_TAG',
  'NEWS_COLUMN',
  'BUSINESS_STATUS'
)

export const downloadAssets = async (
  page: URL,
  $: cheerio.CheerioAPI,
  content$: cheerio.Cheerio<cheerio.Element>
) => {

  const imgs$ = $('img', content$)

  const { pathname, origin } = page

  const pagePath = pathname.split('/').slice(0, -1).join('/')
  const current = new URL(pagePath, origin)

  await Promise.all(
    imgs$.toArray().map(async el => {
      const el$ = $(el)
      const src = el$.prop('src')
      if (!src) {
        app.warn(`页面 ${page.href} 存在残缺的<img>: ${el$.html()} `)
        return
      } else if (src.startsWith('/')) {
        app.debug(`页面 ${page.href} 跳过图片下载: ${src} `)
      } else {
        try {
          const source = new URL(path.join(current.pathname, src), current.origin)
          const filename = source.pathname.slice(1)
          const target = path.resolve(DOWNLOAD_PATH, filename)
          await download(source.href, target)
          const accessSrc = path.join(TOMCAT_ACESS_PREFIX, filename)
          el$.prop('src', accessSrc)
          app.debug(`页面${page.href}下载图片: ${src} | ${source.href} ==> ${target} | 访问路径: ${accessSrc}`)
        } catch (error) {
          throw new Error(`页面 ${page.href} 下载图片 ${src} 失败`, { cause: error })
        }
      }
    })
  )
}

const baseEntity = {
  user_id,
  news_tag,
  news_column,
  business_status,
  news_secrecy: 1,
  comment_setting: 1,
  news_publish_state: 4,
  news_browse_setting: 0,
} as NewsEntity

export const transformPost2NewsEntity = (post: Post): NewsEntity => {

  const { title, source, publish, author, text, abstract } = post

  return {
    ...baseEntity,
    news_title: title,
    news_source: source,
    news_publish_time: publish,
    news_author: author,
    news_text: text,
    news_abstract: abstract,
  }
}

