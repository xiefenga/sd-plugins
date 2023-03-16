import { configurationMap } from '@/config'
import ChinaGeoJson from '@/assets/ChinaGeo.json'

export type Coordinate = [x: number, y: number]

export type GeoFeatures = (typeof ChinaGeoJson)['features'][number]

export type GeoFeaturesWithValidProvince = GeoFeatures & {
  properties: {
    name: string
    center: Coordinate
  }
}

export interface Province {
  name: string
  center: Coordinate
}


export type ConfigurationMapType = typeof configurationMap

export type ConfigurationMapKeys = keyof ConfigurationMapType

export type ConfigurationMapValues = ConfigurationMapType[keyof ConfigurationMapType]

export type ConfigurationInput = {
  [key in ConfigurationMapKeys]: string
}

export type ConfigurationOuput = {
  [key in ConfigurationMapValues]: string
}

export interface UserSearchResp {
  age: number
	birthday: string
	login_name: string
	name: string
	office_code: string
	office_name: string
	user_idcode: string
	user_rank: string
	user_tag: string
  avatar: string
}
