/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/quotes */
// @ts-nocheck
import request from 'sd-plugin-request'

/**
 * 查询资产(新的)
 * @param {*} params
 */
export const getAssets = (cata, type, params2) => request.post(`asset/queryList?cata=${cata}&type=${type}`, params2)

/**
 * 查询资产
 */
export const queryAssetById = (id) => request.get("asset", { params: { asset_id: id } })
export const queryThemeList = (params) => request.get("bigscreen/template/queryThemeList")
