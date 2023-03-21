import '../../init.js'
import { commitEventHandler } from './hanlder.js'

const commites = new Array(100).fill(
  {
    url: 'string',
    post: {
      title: 'string',
      source: 'string',
      publish: '2022-02-21',
      author: 'string',
      text: 'string',
      abstract: 'string',
    },
  }
)

commites.forEach(commit => {
  commitEventHandler(commit)
})
