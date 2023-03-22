import request from 'sd-plugin-request'

interface QueryResp {
  id: string
  color: string
  name: string
  logo: string
}

export const queryTheme = async (apiKey: string, user_id: string) => {
  const { data } = await request.post<QueryResp[]>(
    `/service/dataapi/rest/${apiKey}`,
    { user_id }
  )

  if (data.length === 0) {
    return null
  }

  const { id } = data[0]

  return { id }
}

export const addTheme = async (
  apiKey: string,
  user_id: string,
  id: string
) => {
  await request.post<QueryResp>(
    `/service/dataapi/rest/${apiKey}`,
    {
      columnList: [
        {
          col_name: 'user_id',
          col_value: user_id,
        },
        {
          col_name: 'id',
          col_value: id,
        },
      ],
    }
  )
}

export const updateTheme = async (
  apiKey: string,
  user_id: string,
  id: string
) => {
  await request.post(
    `/service/dataapi/rest/${apiKey}`,
    {
      queryCondition: {
        queryParams: [
          {
            col_name: 'user_id',
            value: user_id,
          },
        ],
      },
      'columnList': [
        {
          col_name: 'id',
          col_value: id,
        },
      ],
    })
}