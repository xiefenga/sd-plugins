import { request } from 'undici'
import * as cheerio from 'cheerio'
import PostParser from '../parser/PostParser.js'
import { app as logger } from '../config/logger.js'
import { ArticlePreview } from '../types/entity.js'
import ListPostParser from '../parser/ListPostParser.js'

// 列表: 军委要闻 & 机关动态  
export const getArticleList = async (url: string) => {
  const { body } = await request(url)
  const html = await body.text()
  const $ = cheerio.load(html)
  const jsonText = $('#list-data').text().trim()
  const listJSON = jsonText ? jsonText : '[]' // 空列表
  try {
    return JSON.parse(listJSON) as ArticlePreview[]
  } catch (error) {
    throw new Error(`页面 ${url} 解析JSON错误: ${jsonText}`, { cause: error })
  }
}

export const getQJWListPost = async (url: string, abstract: string, updateTime: string) => {

  logger.info(`开始爬取${url}`)

  const { body } = await request(url)

  const html = await body.text()

  const parser = new ListPostParser(html, url, abstract, updateTime)

  return await parser.parse()
}

export const getBDXYPost = async (url: string) => {
  logger.info(`开始爬取${url}`)

  const { body } = await request(url)

  const html = await body.text()

  const parser = new PostParser(html, new URL(url), '')

  return await parser.parse()
}