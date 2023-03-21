import EventEmitter from 'events'
import { commitEventHandler, doneEvnentHandler } from './commits/hanlder.js'

export const COMMIT_EMITTER = new EventEmitter()

export enum COMMIT_EVENTS {
  COMMIT = 'commit',
  DONE = 'done'
}

COMMIT_EMITTER.on(COMMIT_EVENTS.COMMIT, commitEventHandler)

COMMIT_EMITTER.on(COMMIT_EVENTS.DONE, doneEvnentHandler)