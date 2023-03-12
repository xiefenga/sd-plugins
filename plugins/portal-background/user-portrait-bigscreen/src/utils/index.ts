import dayjs from 'dayjs'
import { configurationMap } from '@/config'
import {
  // GEO
  GeoFeatures,
  GeoFeaturesWithValidProvince,
  // Configuration
  ConfigurationInput,
  ConfigurationMapKeys,
  ConfigurationOuput
} from '@/types'



export const getToken = () => {
  const urlSearchParams = new URLSearchParams(location.search)
  return urlSearchParams.get('token') ?? window.token
}

export function isGeoFeaturesWithValidProvince(feature: GeoFeatures): feature is GeoFeaturesWithValidProvince {
  return Array.isArray(feature.properties.center)
}

const current = dayjs()

export const isCurrentMonth = (ins: dayjs.Dayjs) => {
  return ins.year() === current.year() && ins.month() === current.month()
}

export const transformPluginConfigration = (config: ConfigurationInput): ConfigurationOuput => {
  return Object.entries(config)
    .reduce((output, [key, value]) => ({
      ...output,
      [configurationMap[key as ConfigurationMapKeys]]: value,
    }), {} as ConfigurationOuput)
}

interface Column {
  col_name: string
}

export const getAssetsColumnIndex = (colum: Column[], cols: string[]) => {
  return colum.reduce((memo, item, index) => {
    const idx = cols.indexOf(item.col_name)
    if (idx >= 0) {
      memo[idx] = index
    }
    return memo
  }, new Array(cols.length).fill(0) as number[])
}

export const assertConfiguration = (config: Partial<ConfigurationInput>): config is ConfigurationInput => {
  return Object.values(config).every(c => !!c)
}

export const NOOP = () => { }

export const getCookie = (name: string) => {
  const x = document.cookie.split(';').map(item => item.split('=') as [string, string])
  const map = new Map<string, string>(x)
  return map.get(name) ?? ''
}


