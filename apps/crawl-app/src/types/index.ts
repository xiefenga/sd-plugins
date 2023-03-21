import * as cheerio from 'cheerio'

export interface ParserResult {
  title: string
  source: string
  publish: string
  author: string
  content$: cheerio.Cheerio<cheerio.Element>
}

export interface TemplateParser {
  name: string
  accept: ($: cheerio.CheerioAPI) => boolean
  parse($: cheerio.CheerioAPI): ParserResult
}