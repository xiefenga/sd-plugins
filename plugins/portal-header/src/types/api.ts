
/**
 * companyName 组织
 * userName 身份
 * name 姓名
 * photo 头像
 */
export interface User {
	account_code: string
	companyName: string
	company_id: string
	del_flag: number
	directSubCompany: string
	email: string
	gender: number
	id: string
	is_default_password: number
	is_online: boolean
	loginName: string
	login_fail_count: number
	login_flag: string
	logout_date: number
	name: string
	no: string
	officeId: string
	office_name: string
	phone: string
	photo: string
	roleList: string[]
	roleNameList: string[]
	update_by: string
	update_date: number
	userName: string
	user_type: number
}

export interface MenuGroupResp {
  data_id: string
  menuType: string
  menuTypeTitle: string
}