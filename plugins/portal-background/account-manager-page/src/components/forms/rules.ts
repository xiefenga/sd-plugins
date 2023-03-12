import { LOGIN_NAME_PATTERN, PASSWORD_PATTERN } from '@/util/patterns'

export const LOGIN_NAME_RULES = [
  {
    required: true,
    message: '请输入登录名！',
  },
  {
    pattern: LOGIN_NAME_PATTERN,
    message: '登录名不能包含空格！',
  },
]

export const PASSWORD_RULES = [
  {
    required: true,
    message: '请输入密码！',
  },
  {
    pattern: PASSWORD_PATTERN,
    message: '请输入8-20个字符，必须同时包含数字字母和特殊字符！',
  },
]

export const NAME_RULES = [
  { required: true, message: '请输入姓名！' },
]