import * as cheerio from 'cheerio'
import { TemplateParser } from '../types/index.js'

export const template1: TemplateParser = {
  /**
   * example: 
   * http://www.qjw.jw/article/2020/05/06/43648.html
   */
  name: 'template1',
  accept: ($: cheerio.CheerioAPI) => {
    const elements = [
      $('header h1', 'article'),
      $('header  .article-info', 'article'),
      $('section#content', 'article'),
    ]
    return elements.every(el => el.length !== 0)
  },
  parse($: cheerio.CheerioAPI) {

    const headerContext = $('article header')

    const h1$ = $('h1', headerContext)

    if (h1$.length === 0) {
      throw new Error('title 缺失')
    }

    const title = h1$.text().trim()

    const articleInfo$ = $('.article-info .pull-left dl.first-row dd', headerContext)

    const icons$ = $('.article-info .pull-left dl.first-row dt i', headerContext)

    if (articleInfo$.length === 0 || icons$.length === 0) {
      throw new Error('articleInfo 缺失')
    }

    const articleInfoValues = articleInfo$.toArray().map(el => $(el).text())

    let source = '', publish = '', author = ''

    icons$.toArray().forEach((icon, index) => {
      const icon$ = $(icon)
      if (icon$.hasClass('fa-home')) {
        source = articleInfoValues[index]
      } else if (icon$.hasClass('fa-clock')) {
        publish = articleInfoValues[index]
      } else if (icon$.hasClass('fa-pencil-square-o')) {
        author = articleInfoValues[index]
      }
    })

    const blockquote = $('blockquote', headerContext).html()

    const content$ = $('article section#content')

    if (content$ === null) {
      throw new Error('content 缺失')
    }

    $('script', content$).remove()

    const content = content$.html() ?? content$.text().trim()

    const text = `<div>${blockquote}${content}</div>`

    return { title, source, publish, author, text, content$ }
  },
}


export const template2: TemplateParser = {
  /**
   * example:
   * http://xxjy.qjw.jw/article/2022/04/05/31447.html
   */
  name: 'template2',
  accept: ($: cheerio.CheerioAPI) => {
    const context$ = $('section.content .container .row .item')
    const elements = [
      context$,
      $('h3', context$),
      $('.cpyfrom', context$),
    ]
    return elements.every(el => el.length !== 0)
  },

  parse($: cheerio.CheerioAPI) {

    const context$ = $('section.content .container .row .item')

    const breadcrumb$ = $('.breadcrumb', context$)

    const h3$ = $('h3', context$)

    if (h3$.length === 0) {
      throw new Error('标题缺失')
    }

    const title = h3$.text().trim()

    const cpyrom$ = $('.cpyfrom', context$)

    const publish$ = $('.addtime', cpyrom$)

    if (publish$.length === 0) {
      throw new Error('发布时间缺失')
    }

    const publish = publish$.text()
      .replace('发布时间：', '')
      .trim()


    const from$ = $('.from', cpyrom$)

    if (from$.length === 0) {
      throw new Error('来源信息缺失')
    }

    const [source, author] = from$.text()
      .replace('来源：', '')
      .split('编辑：')
      .map(text => text.trim())

    if (!source || !author) {
      throw new Error('来源和作者缺失')
    }

    breadcrumb$.remove()
    h3$.remove()
    cpyrom$.remove()

    const content$ = context$

    if (content$ === null) {
      throw new Error('content 缺失')
    }

    $('script', content$).remove()

    const text = content$.html() ?? content$.text()

    return { title, source, publish, author, text, content$ }
  },
}


export const template3: TemplateParser = {
  /**
   * example:
   *  http://www.qjw.jw/article/2023/02/15/93318.html
   */
  name: 'template3',
  accept: ($: cheerio.CheerioAPI) => {
    const context$ = $('.container .ssa--show-page .row .news-content')
    const elements = [
      $('h2', context$),
      $('.fu-title', context$),
      $('.remark', context$),
      $('.content-p', context$),
    ]
    return elements.every(el => el.length !== 0)
  },
  parse($: cheerio.CheerioAPI) {

    const context$ = $('.container .ssa--show-page .row .news-content')

    const h2$ = $('h2', context$)

    if (h2$.length === 0) {
      throw new Error('标题缺失')
    }

    const title = h2$.text().trim()
    const articleInfo$ = $('.fu-title .row > div:first-child span', context$)

    if (articleInfo$.length === 0) {
      throw new Error('编辑和时间缺失')
    }

    const texts = articleInfo$.toArray().map(el => $(el).text())

    if (texts.filter(item => item.includes('责任编辑：') || item.includes('时间：')).length === 0) {
      throw new Error('编辑和时间缺失')
    }

    let author = '', publish = '', source = ''

    texts.forEach(item => {
      if (item.includes('责任编辑：')) {
        author = item.replace('责任编辑：', '').trim()
      } else if (item.includes('时间：')) {
        publish = item.replace('时间：', '').trim()
      } else if (item.includes('来源：')) {
        source = item.replace('来源：', '').trim()
      }
    })

    const content$ = $('.content-p', context$)

    if (content$.length === 0) {
      throw new Error('内容缺失')
    }

    $('script', content$).remove()


    const text = content$.html() ?? content$.text()

    return { title, author, publish, text, source, content$ }
  },
}


export const template4: TemplateParser = {
  /**
   * example:
   *  http://xlfw.qjw.jw/template/pages/tzgg_14.html
   */
  name: 'template4',
  accept: ($: cheerio.CheerioAPI) => {
    const context$ = $('.contentleft')
    const elements = [
      $('.article_title', context$),
      $('.article_title_sec', context$),
      $('.article_info', context$),
      $('.article_content', context$),
    ]
    return elements.every(el => el.length !== 0)
  },

  parse($: cheerio.CheerioAPI) {

    const context$ = $('.contentleft')

    const title$ = $('.article_title', context$)

    if (title$.length === 0) {
      throw new Error('')
    }

    const title = title$.text().trim()

    const author$ = $('.article_title_sec', context$)

    if (author$.length === 0) {
      throw new Error('作者缺失')
    }

    const author = author$.text().trim()

    const articleInfo$ = $('.article_info .left', context$)

    if (articleInfo$.length === 0) {
      throw new Error('文章信息缺少')
    }

    const [publish, source] = articleInfo$.text().trim()
      .replace(/来源：|阅读：/g, '^')
      .split('^').map(item => item.trim())

    if (!publish || !source) {
      throw new Error('发布时间或来源缺少')
    }

    const content$ = $('.article_content', context$)

    if (content$.length === 0) {
      throw new Error('内容缺少')
    }

    $('script', content$).remove()

    const text = content$.html() ?? content$.text().trim()

    return { title, author, publish, source, text, content$ }
  },
}


export const template5: TemplateParser = {
  /**
   * example:
   *  http://kjw.qjw.jw/article/2023/01/03/824.html
   */
  name: 'template5',
  accept: ($: cheerio.CheerioAPI) => {
    const context$ = $('article.article')
    const elements = [
      $('header h1', context$),
      $('header .pull-left dl ', context$),
      $('section.content', context$),
    ]
    return elements.every(element => element.length !== 0)
  },

  parse($: cheerio.CheerioAPI) {

    const context$ = $('article.article')
    const title$ = $('header h1', context$)

    if (title$.length === 0) {
      throw new Error('标题缺少')
    }

    const title = title$.text().trim()

    const articleInfo$ = $('.pull-left dl > *', context$)

    if (articleInfo$.length === 0) {
      throw new Error('文章信息缺少')
    }

    let publish = '', source = ''
    const author = ''

    const info$ = $('dd', articleInfo$)

    $('dt i', articleInfo$).toArray().forEach((el, i) => {
      const el$ = $(el)
      if (el$.hasClass('icon-time')) {
        publish = info$.eq(i * 2 + 1).text().trim()
      } else if (el$.hasClass('icon-edit')) {
        source = info$.eq(i * 2 + 1).text().trim()
      }
    })

    const content$ = $('section.content', context$)

    if (content$.length === 0) {
      throw new Error('文章内容缺少')
    }


    const text = content$.html() ?? content$.text().trim()

    return { title, text, publish, source, author, content$ }
  },
}

export const bdxw: TemplateParser = {
  name: 'bdxw',
  accept: ($: cheerio.CheerioAPI) => {
    const elements = [
      $('blockquote h1'),
      $('blockquote p.articleAttr '),
      $('.qjw-nom-content'),
    ]
    return elements.every(element => element.length !== 0)
  },
  parse($: cheerio.CheerioAPI) {
    const h1$ = $('blockquote h1')

    if (h1$.length === 0) {
      throw new Error('缺少标题')
    }

    const title = h1$.text()

    const articleInfo$ = $('blockquote p.articleAttr')

    if (articleInfo$.length === 0) {
      throw new Error('缺少文章信息')
    }

    const infos = $('.articleAttr').text().trim().split('|')

    const publish = infos[0].trim()

    const author = infos[2].replace('作者：', '').trim()

    const content$ = $('.qjw-nom-content')

    const text = content$.html() ?? ''

    const source = $('.bread li').eq(0).text().trim()

    return { title, source, publish, author, text, content$ }
  },
}
