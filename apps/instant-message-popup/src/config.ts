type ReduceFn<T = string> = (
  memo: Record<string, T>,
  entry: [string, string]
) => Record<string, T>

const reduceFn: ReduceFn = (memo, [key, value]) => {
  return { ...memo, [key]: value }
}

const reduceTransFn: ReduceFn<number> = (memo, [key, value]) => {
  return { ...memo, [key]: Number(value) }
}

function parseParamsFromUrl(urlStr: string) {
  const url = new URL(urlStr)

  const params = new URLSearchParams(url.search)

  return Array.from(params.entries()).reduce(reduceFn, {})
}

function parseConfigFromScript() {
  if (!document.currentScript) {
    return {}
  }

  const source = (document.currentScript as HTMLScriptElement).src
  const params = parseParamsFromUrl(source)

  const config = Object.entries(params)
    .filter(([key]) => key in defaultConfig)
    .reduce(reduceTransFn, {})

  return config
}

const defaultConfig = {
  wait: 5, // 单个通知停留时间
  delay: 500, // 新增下个弹窗等待时间
  max: 5, // 最大弹窗数
  pollInterval: 30, // 轮询时间
  gap: 60, // 时间范围
}

const parsedConfig = parseConfigFromScript()

export default {
  ...defaultConfig,
  ...parsedConfig,
}
