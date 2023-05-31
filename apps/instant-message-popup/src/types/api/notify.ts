export interface Notice {
  buttons: Button[]
  create_time: number
  del_flag: 0
  id: string
  info_content: string
  info_opt_type: string
  info_status: string
  info_title: string
  info_type: string
  info_url: string
  info_url_title: string
  last_modify_time: number
  object_id: string
  service_type: string
  user_id: string
}

interface Button {
  button_name: string
  id: string
  info_id: string
  response_type: string
  sort: number
  url: string
}