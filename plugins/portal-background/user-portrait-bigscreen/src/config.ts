import { ConfigurationInput } from './types'

export const designWidth = 1860

export const designHeight = 970

export const enablePollingInterval = false

export const configurationMap = {
  '按职级访问量资产ID': 'rankAssetsId',
  '新闻访问量趋势资产ID': 'newsAssetsId',
  '按栏目维度访问量资产ID': 'columnAssetsId',
  '训教管业务访问资产ID': 'trainingAssetsId',
  '论坛帖子访问量资产ID': 'postAssetsId',
  '典型应用和工具访问量资产ID': 'appAssetsId',
  '部队访问量资产ID': 'troopAssetsId',
  '论坛板块访问量资产ID': 'sectionAssetsId',
  '轮询间隔(ms)': 'pollingInterval',
} as const


export const devConfiguration: ConfigurationInput = {
  '按职级访问量资产ID': 'ac04912a-5b41-4ce3-9020-141d19df99fd',
  '新闻访问量趋势资产ID': '72ce7fcc-fc1a-4c9e-8515-ef5b3bc8943f',
  '按栏目维度访问量资产ID': '203a4107-bfbd-43fa-ba21-b54488db398c',
  '训教管业务访问资产ID': '6250419d-6b3b-49d3-b102-462bc970f6c2',
  '论坛帖子访问量资产ID': 'e2719838-3023-4d13-bf53-389208736a09',
  '典型应用和工具访问量资产ID': 'b4576d79-7d0a-4c0e-8277-8f83530ca289',
  '部队访问量资产ID': 'c9f9ca3f-8676-477a-b550-dca413bf07fd',
  '论坛板块访问量资产ID': '1d6f17b7-07f4-42bb-ac47-53a70e3586e7',
  '轮询间隔(ms)': '3000',
}