import '../init.js'
import { COMMIT_EMITTER, COMMIT_EVENTS } from './commits.js'

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
  COMMIT_EMITTER.emit(COMMIT_EVENTS.COMMIT, commit)
})



