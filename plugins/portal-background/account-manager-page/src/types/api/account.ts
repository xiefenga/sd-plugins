export interface UserResp {
	account: string
	code: string
	craeteDate: number
	createBy: string
	email: string
	id: string
	loginFailCount: number
	loginFlag: string
	loginName: string
	mobile: string
	no: string
	photo: string
	pwdUpdateTime: number
	registerIp: string
	updateBy: string
	updateDate: number
}

export interface IdentityResp {
	account_code: string
	companyName: string
	company_id: string
	create_by: string
	create_date: number
	del_flag: 0 | 1
	directSubCompany: string
	email: string
	gender: 0 | 1
	id: string
	// is_default: string
	is_default: '0' | '1'
	is_default_password: 0 | 1
	is_online: boolean
	leader_name: string
	loginName: string
	login_app_count: number
	login_count: number
	login_fail_count: number
	login_flag: 0 | 1
	logout_date: number
	mobile: string
	name: string
	no: string
	officeId: string
	office_name: string
	origin: number
	password: string
	photo: string
	registerIp: string
	roleList: string[]
	roleNameList: string[]
	update_by: string
	update_date: number
	userName: string
	user_type: number
}

export interface AccountResp {
	account: string
	code: string
	companyId: string
	craeteDate: number
	createBy: string
	del_flag: 0 | 1
	email: string
	id: string
	loginDate: number
	loginFailCount: number
	loginFlag: 0 | 1
	loginName: string
	mobile: string
	no: string
	origin: number
	password: string
	photo?: string
	pwdUpdateTime: number
	registerIp: string
	updateBy: string
	updateDate: number
	userSign?: string
}

export interface OfficeResp<Root extends 'root' | 'normal' = 'root'> {
	starffCount: number
	office: Root extends 'root' ? RootOffice : NormalOffice
}

export interface RootOffice {
	address: string
	city: string
	city_label: string
	code?: string
	count: number
	country: string
	country_label: string
	grade: string
	grade_label: string
	hasChild: boolean
	id: string
	layout: number
	member_num: number
	name: string
	officeType: string
	origin: number
	parentId: string
	parentIds: string
	province: string
	province_label: string
	sort: number
	trade: string
	trade_label: string
	userItems: []
}


export interface NormalOffice {
	children: OfficeChildren[]
	code?: string
	count: number
	hasChild: boolean
	id: string
	layout: number
	member_num: number
	name: string
	officeType: string
	origin: number
	parentId: string
	parentIds: string
	sort: number
	userItems: []
}

interface OfficeChildren {
	children: OfficeChildren[]
	count: number
	hasChild: boolean
	id: string
	layout: number
	member_num: number
	name: string
	sort: number
	userItems: []
}

export type UserAllResp = [UserAll_1[], UserAll_2[]]


export interface UserAll_1 {
	account_code: string
	company_id: string
	create_date: number
	del_flag: number
	directSubCompany: string
	email: string
	gender: number
	id: string
	is_default: string
	is_default_password: number
	is_online: boolean
	loginName: string
	login_app_count: number
	login_count: number
	login_date: number
	login_fail_count: number
	login_flag: string
	name: string
	no: string
	officeId: string
	password: string
	photo: string
	userName: string
	user_type: number
}

interface UserAll_2 {
	count: number
	hasChild: boolean
	id: string
	layout: number
	member_num: number
	name: string
	officeType: string
	origin: number
	parentId: string
	parentIds: string
	sort: number
	userItems: any[]
}

export interface OfficeDelCreateMemberResp {
	children: OfficeDelCreateMemberChildren[]
	count: number
	hasChild: boolean
	id: string
	layout: number
	member_num: number
	name: string
	userItems: any[]
}

export interface OfficeDelCreateMemberChildren {
	children: OfficeDelCreateMemberChildren[]
	count: number
	hasChild: boolean
	id: string
	layout: number
	member_num: number
	name: string
	sort: number
	userItems: any[]
}


export interface BussinessUserResp {
  BDNM: string
  MC: string
  SFZHM: string
  XH: string
}

export interface RoleResp {
	company_id: string
	create_member: string
	create_time: number
	id: string
	last_modifer: string
	last_modifer_time: number
	name: string
	origin: number
	roleItemList: RoleItem[]
}

export interface RoleItem {
	enname: string
	group_id: string
	id: string
	name: string
	origin: number
	roleMenuItemList: RoleMenuItem[]
	role_type: string
	useable: string
	zhname: string
}

export interface RoleMenuItem {
	menu_id: string
	privs: string
	role_id: string
}

export interface CurrentUserResp {
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