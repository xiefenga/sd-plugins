
// const checkName = (rule, value, callback) => {
//   let flag = false
//   identityList.forEach(item => {
//     if (
//       item.userName === value &&
//       ((model.userName !== '' && value !== model.userName) ||
//         !model.userName ||
//         model.userName === '')
//     ) {
//       flag = true
//     }
//   })
//   if (flag) {
//     callback('名称不能重复！')
//   } else {
//     callback()
//   }
// }

// export const IDENTITY_NAME_RULES = [
//   {
//     required: true,
//     message: '请输入名称！',
//   },
//   {
//     validator: checkName,
//   },
// ]

export const OFFICE_RULES =[
  { required: true,  message: '请选择组织！' },
]

export const ROLE_RULES = [
  { required: true, message: '请选择角色！' },
]

export default ''