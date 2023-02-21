import JSEncrypt from 'jsencrypt'

export const PUBLIC_KEY = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANNmSJW87EE2Z3KDW5Kod8cL + 7lUBgfKLm86CGfMQxvc8w + JnOE7GV72DVyg2kCMGho5g9AR64BmrGobbG4xMZECAwEAAQ =='

export const encryptPassword = (text: string) => {
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(
    '-----BEGIN PUBLIC KEY-----' +
    PUBLIC_KEY +
    '-----END PUBLIC KEY-----'
  )
  return encrypt.encrypt(text).toString()
}
