import { request } from 'undici'
import * as cheerio from 'cheerio'
import { $Env } from '../utils/env.js'
import { app as logger } from '../config/logger.js'

export const parseHome = async (url: string) => {
  logger.info('=== parseHome ===', url)
  const { body } = await request(url)
  const html = await body.text()
  logger.info('html request success')
  const $ = cheerio.load(html)
  logger.info('$ load success')
  const context$ = $('.nav-bar .container > ul.qj-link li:first-child > ul')
  const link$ = $('li:not(:first-child) a', context$)
  logger.info(link$.toArray().map(el => ({ text: $(el).text(), link: $(el).prop('href')! })))
  logger.info('=== parseHome ===')
  return link$.toArray().map(el => ({ text: $(el).text(), link: $(el).prop('href')! }))
}

export const parseJWYW = async (url: string) => {
  const { body } = await request(url)
  const html = await body.text()
  const $ = cheerio.load(html)
  const link$ = $('.container-fixed-md-jwdt > .row > div:first-child > .row:last-child .title-box1 .wenzi a')
  return link$.toArray().map(el => {
    const text = $(el).text().trim()
    const href = $(el).prop('href')
    const base = new URL(url).origin
    return {
      text,
      link: href ? `${base}${href}` : '',
    }
  }).filter(item => !!item.link)
}

export const parseJGDT = async (url: string) => {
  const { body } = await request(url)
  const html = await body.text()
  const $ = cheerio.load(html)
  const title$ = $('.container-fixed-md-jwdt > .row > div.row .col-xs-4 > .title-box2')
  return title$.toArray().map(el => {
    const text = $('span.wenzi', el).text().trim()
    const href = $('span.more-s1 a', el).prop('href')
    const base = new URL(url).origin
    return {
      text,
      link: href ? `${base}${href}` : '',
    }
  }).filter(item => !!item.link)
}

export const getQJWAllList = async () => {

  const listUrls: { text: string, link: string }[] = []

  const [jwyw, jgdt, _, tzgg] = await parseHome($Env('QJW_URL'))

  const jwywList = await parseJWYW(jwyw.link)

  const jgdtList = await parseJGDT(jgdt.link)

  listUrls.push(tzgg)

  listUrls.push(...jwywList)

  listUrls.push(...jgdtList)

  return listUrls
}

// 解析部队新闻
export const parseBDXW = async () => {
  const url = $Env('QJW_BDXW_URL') 
  const { body } = await request(url)
  const html = await body.text()
  const $ = cheerio.load(html)
  const list: string[] = []
  const bigLink = $('.container.margin-large-top.text-center > a').eq(0).attr('href')
  if (bigLink) {
    list.push(bigLink)
  }
  const carouselLinks = $('#main-banner a').toArray()
    .map(item => $(item).attr('href'))
    .filter(item => item) as string[]

  list.push(...carouselLinks)

  const rightTopLinks = $('.list-unstyle.height-big.text-big .text-more a').toArray()
    .map(item => $(item).attr('href'))
    .filter(item => item) as string[]

  list.push(...rightTopLinks)

  // 军营关注
  const jygzLinks = $('.line-big a:not(.text-main):not(.text-white):not(.float-left)', $('.line-big.margin-large-top').eq(0)).toArray()
    .map(item => $(item).attr('href'))
    .filter(item => item) as string[]

  list.push(...jygzLinks)

  // 部队要闻
  const bdywLinks = $('> :not(.x12.margin-big-bottom) a:not(.text-main):not(.text-white)', $('.line-big.margin-large-top').eq(1)).toArray()
    .map(item => $(item).attr('href'))
    .filter(item => item) as string[]

  list.push(...bdywLinks)

  return [...new Set(list)].map(item => new URL(item, url).href)
}