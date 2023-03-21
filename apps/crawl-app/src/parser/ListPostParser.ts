import PostParser from './PostParser.js'
import type { Post } from '../types/entity.js'

export default class ListPostParser extends PostParser {

  public constructor(
    html: string,
    url: string,
    abstract: string,
    private updateTime: string
  ) {
    super(html, new URL(url), abstract)
  }

  public async parse(): Promise<Post> {
    const post = await super.parse()
    const { publish } = post
    post.publish = publish === '' 
      ? this.updateTime 
      : publish
    return post
  }
}
