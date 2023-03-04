
export interface MenuGroupResp {
  data_id: string
  menuType: string
  menuTypeTitle: string
}

interface CommonlyUsedAppData {
  click_num: string
  create_member: string
  data_id: string
  desc: string
  menuType: string
  name: string
  no_access_photo: string
  office_id: string
  open_time: string
  photo: string
  url: string
  user_id: string
}

export interface CommonlyUsedAppResp {
  dataList: CommonlyUsedAppData[]
}