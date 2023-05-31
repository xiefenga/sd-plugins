import { rest } from 'msw'

type Handler = Parameters<typeof rest.get>[1]

const handler: Handler = (req, res, ctx) => {
  return res(
    ctx.json({
      status: 200,
      message: '查询成功',
      result: [
        {
          BDNM: 'ysmn09930',
          MC: 'faaf',
          SFZHM: 'xxx',
          XH: 'xxx',
        },
      ],
    })
  )
}

export const handlers = [
  rest.get('/sdata/rest/business/queryUsers', handler),
]
