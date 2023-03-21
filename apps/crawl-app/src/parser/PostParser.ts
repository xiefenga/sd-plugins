import * as cheerio from 'cheerio'
import { Post } from '../types/entity.js'
import { TemplateParser } from '../types/index.js'
import * as templates from '../utils/templates.js'
import { downloadAssets } from '../utils/helper.js'

const templateList = [...Object.values(templates)]

type Optional<T> = T | undefined

export default class PostParser {

  private $: cheerio.CheerioAPI

  private parser: Optional<TemplateParser>

  public constructor(
    html: string,
    private url: URL,
    private abstract: string
  ) {
    this.$ = cheerio.load(html)
    this.parser = templateList.find(
      template => template.accept(this.$)
    )
  }

  public async parse(): Promise<Post> {
    const errorMessage = `页面${this.url.href}爬取失败`
    if (!this.parser) {
      throw new Error(errorMessage, { cause: new Error('缺少页面模板') })
    }
    try {
      const { content$, ...info } = this.parser.parse(this.$)
      await downloadAssets(this.url, this.$, content$)
      return {
        ...info,
        text: content$.html()?.trim() ?? '',
        abstract: this.abstract,
      }
    } catch (error) {
      throw new Error(errorMessage, { cause: error })
    }
  }
}