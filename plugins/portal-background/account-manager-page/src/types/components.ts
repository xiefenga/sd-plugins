import { AccountBaseParam } from './params'

export interface Office {
  officeId: string
  office_name: string
}

export interface Role {
  roleList: string[]
  roleNameList: string[]
}


export type AccountFormMode = 'add' | 'update'

export interface DeleteUserMap {
  [id: string]: string
}

type AccountFormParams =
  | AccountBaseParam & { deleteUserMap?: DeleteUserMap }
  | AccountBaseParam & { password: string }

export interface AccountFormSubmit {
  (params: AccountFormParams): Promise<void>
}

export interface AccountFormValue extends AccountBaseValue {
  password?: string
  newPassword?: string
}


export interface DrawerAccountValue {
  account: AccountBaseValue
  identityList: IdentityValue[]
}

export interface AccountBaseValue {
  loginName: string
  name: string
  no: string
  mobile?: string
  email?: string
  photo?: string
  user_sign?: string
  identity?: any[]
}

export interface IdentityFormValue {
  is_default?: '0' | '1'
  _key: string
  officeId: string
  office_name: string
  userName: string
  roleList: string[]
  roleNameList: string[]
  leader?: string
  leader_name?: string
  authority?: number
}

export interface IdentityFormIns {
  userName: string,
  office_name: string,
  role: string,
  leader_name?: string,
  authority?: number,
}


export interface IdentityValue extends IdentityFormValue {
  id?: string
  is_default: '0' | '1'
}