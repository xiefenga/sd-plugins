import * as echarts from 'echarts'
import { Province } from '@/types'
import ChinaGeoJson from '@/assets/ChinaGeo.json'
import { isGeoFeaturesWithValidProvince } from '.'
import { renderContext } from './context'

const { LinearGradient } = echarts.graphic

export const CHART_CONTEXT = require.context('@/components/charts', false, /.tsx$/)

export const OPTION_COLORS = [
  new LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#5EBFE9' },
    { offset: 1, color: '#5EBFE900' },
  ]),
  new LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#2CA6A6' },
    { offset: 1, color: '#2CA6A600' },
  ]),
  new LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#5470c6' },
    { offset: 1, color: '#5470c600' },
  ]),
  new LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#3ba272' },
    { offset: 1, color: '#3ba27200' },
  ]),
  new LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#73c0de' },
    { offset: 1, color: '#73c0de00' },
  ]),
  new LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#fc8452' },
    { offset: 1, color: '#fc845200' },
  ]),
  new LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#9a60b4' },
    { offset: 1, color: '#9a60b4' },
  ]),
]

export const PROVINCES = ChinaGeoJson.features
  .filter(isGeoFeaturesWithValidProvince)
  .map<Province>(({ properties: { name, center } }) => ({ name, center }))

export const ALL_SCREEN_CHARTS = renderContext(CHART_CONTEXT)

export const IS_DEV = process.env.NODE_ENV === 'development'