import request from './request'
import { Notice } from '@/types/api/notify'

export const queryNotices = async () => {
  const resp = await request('sysInfo/queryList', {
    method: 'POST',
    data: {
      pageSize: 5,
      pageNum: 1,
      orderBy: 'create_time',
      orderSort: 'DESC',
      queryParams: [
        {
          colName: 'info_status',
          type: 2,
          value: '1',
        },
      ],
    },
  })
  return resp.data.results as Notice[]
}