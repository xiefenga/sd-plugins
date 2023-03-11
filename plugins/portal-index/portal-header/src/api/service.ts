import request from 'sd-plugin-request'
import { ThemeColor, Theme } from 'portal-shared'

interface QueryResp {
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

  const { name, logo, color } = data[0]

  return { name, logo, color: JSON.parse(color) as ThemeColor } as Theme
}

export const addTheme = async (
  apiKey: string,
  user_id: string,
  theme: Theme
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
          col_name: 'name',
          col_value: theme.name,
        },
        {
          col_name: 'logo',
          col_value: theme.logo,
        },
        {
          col_name: 'color',
          col_value: JSON.stringify(theme.color),
        },
      ],
    }
  )
}

export const updateTheme = async (
  apiKey: string,
  user_id: string,
  theme: Theme
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
          col_name: 'color',
          col_value: JSON.stringify(theme.color),
        },
        {
          col_name: 'name',
          col_value: theme.name,
        },
        {
          col_name: 'logo',
          col_value: theme.logo,
        },
      ],
    })
}