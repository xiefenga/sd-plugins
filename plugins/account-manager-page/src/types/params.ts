
export interface AccountBaseParam {
  loginName: string
  name: string
  userItemList: UserItem[]
  no?: string
  mobile?: string
  email?: string
  photo?: string
  user_sign?: string
}

interface UpdateAccountParam extends AccountBaseParam {
  account_code: string
}

interface CreateAccountParam extends AccountBaseParam {
  password: string
}

export interface UserItem {
  id?: string
  loginName: string
  userName: string
  is_default: 0 | 1
  officeId: string
  roleList: string[]
  leader_name?: string
  authority?: number
}

export type AccountParam = CreateAccountParam | UpdateAccountParam