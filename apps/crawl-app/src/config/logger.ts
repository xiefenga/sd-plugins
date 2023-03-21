import log4js from 'log4js'
import path from 'node:path'

const resolveLog = (filename: string) => {
  return path.resolve(process.env.LOG_DIR, `${filename}.log`)
}

log4js.configure({
  appenders: {
    console: { type: 'console' },
    default: {
      type: 'file',
      filename: resolveLog('default'),
      // maxLogSize: 1024 * 10,
    },
    app: {
      type: 'file',
      filename: resolveLog('app'),
      // maxLogSize: 1024 * 10,
    },
    dmdb: {
      type: 'file',
      filename: resolveLog('dmdb'),
      // maxLogSize: 1024 * 10,
    },
    commit: {
      type: 'file',
      filename: resolveLog('commit'),
      // maxLogSize: 1024 * 10,
    },
    schedule: {
      type: 'file',
      filename: resolveLog('schedule'),
      // maxLogSize: 1024 * 10,
    },
    mysql: {
      type: 'file',
      filename: resolveLog('mysql'),
      // maxLogSize: 1024 * 10,
    },
  },
  categories: {
    default: {
      appenders: ['console'],
      level: 'info',
      enableCallStack: true,
    },
    APP: {
      appenders: ['app'],
      level: 'info',
      enableCallStack: true,
    },
    DMDB: {
      appenders: ['dmdb'],
      level: 'info',
      enableCallStack: true,
    },
    COMMIT: {
      appenders: ['commit'],
      level: 'info',
      enableCallStack: true,
    },
    SCHEDULE: {
      appenders: ['schedule'],
      level: 'info',
      enableCallStack: true,
    },
    MYSQL: {
      appenders: ['mysql'],
      level: 'info',
      enableCallStack: true,
    },
  },
})

export const app = log4js.getLogger('APP')

app.level = process.env.LOG_LEVEL

export const dmdb = log4js.getLogger('DMDB')

dmdb.level = process.env.LOG_LEVEL

export const commit = log4js.getLogger('COMMIT')

commit.level = process.env.LOG_LEVEL

export const schedule = log4js.getLogger('SCHEDULE')

schedule.level = process.env.LOG_LEVEL

export const mysql = log4js.getLogger('MYSQL')

mysql.level = process.env.LOG_LEVEL

export const debug = log4js.getLogger()

debug.level = process.env.LOG_LEVEL


