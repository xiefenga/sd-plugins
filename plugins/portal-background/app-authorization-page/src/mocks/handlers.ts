import { rest } from 'msw'
import appResp from './data/allApp.json'
import allRole from './data/allRole.json'
import allPermission from './data/allPermission.json'

export const handlers = [
  rest.get('/sdata/rest/system/role/queryAllRole', (_, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json(allRole)
    )
  }),
  rest.post('/sdata/rest/ext/secondev/roleMenu/queryRoleCustomApps', (req, res, ctx) => {
    return res(
      ctx.delay(2000),
      ctx.status(200),
      ctx.json({
        message: 'query roleapps succeeded',
        status: 200,
        result: [
          {
            app_name: '人员请假管理',
            auth_name: '全部',
            auth_id: '3',
            data_id: '006911ac79a644e8841de1102a2577e2',
            app_id: 'data1668172642022227968',
          },
        ],
      })
    )
  }),
  rest.post('/sdata/rest/asset/data', (req, res, ctx) => {
    const assetId = req.url.searchParams.get('id')
    if (assetId === 'app') {
      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json(appResp)
      )
    } else if (assetId === 'permission') {
      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json(allPermission)
      )
    }
  }),
  rest.post('/sdata/rest/system/secondev/roleMenu/insert', (_, res, ctx) => {
    return res(
      ctx.delay(2000),
      ctx.status(200),
      ctx.json({
        message: 'query roleapps succeeded',
        status: 200,
        result: true,
      })
    )
  }),
  rest.post('/sdata/rest/system/secondev/roleMenu/delete', (_, res, ctx) => {
    return res(
      ctx.delay(2000),
      ctx.status(200),
      ctx.json({
        message: 'query roleapps succeeded',
        status: 200,
        result: true,
      })
    )
  }),
]