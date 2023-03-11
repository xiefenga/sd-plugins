export * from './config/accordion'

export * from './config/header'

import { PORTAL_ACCORDION_PLUGIN, PORTAL_HEADER_PLUGIN } from '@/constants'
import { ThemeEventCenter } from '@/event/EventCenter'
import { Store } from '@/store'
import { StoreApi, UseBoundStore } from 'zustand'
import { AccordionConfig } from './config/accordion'
import { HeaderConfig } from './config/header'

declare global {
  interface Window {
    _0x1461A0_PORTAL_USE_STORE: UseBoundStore<StoreApi<Store>>
    PROTAL_THEME_EVENT_CENTER: ThemeEventCenter
    PROTAL_CONFIGGURATION: {
      [key: string]: any
    }
  }
}

export interface PluginPropsOfConfig {
  isConfig: true,
  onConfigChange: (config: any) => void,
  customConfig: {
    appId: string
    componentId: string
    [PORTAL_HEADER_PLUGIN]?: Partial<HeaderConfig>
    [PORTAL_ACCORDION_PLUGIN]?: Partial<AccordionConfig>
  }
}

export interface PluginProps<T> {
  appId: string
  componentId: string
  customConfig: {
    appId: string
    componentId: string
    [key: string]: T | string
  }
  //  & Partial<T>,
}

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