import fs from 'node:fs'
import path from 'node:path'
import { Writable } from 'node:stream'
import { stream } from 'undici'

export const download = async (url: string, target: string) => {
  const dir = path.dirname(target)
  await fs.promises.mkdir(dir, { recursive: true })
  const out = fs.createWriteStream(target) 
  await stream(url, { opaque: out, method: 'GET' },  args => args.opaque as Writable)
}