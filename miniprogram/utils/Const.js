export const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
export const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const NUMBER    = '0123456789'
export const SPECIAL   = `-.~!@#$%^&*()_:<>,?`

export const REG_LOWERCASE = /[a-z]/
export const REG_UPPERCASE = /[A-Z]/
export const REG_NUMBER    = /[0-9]/
export const REG_SPECIAL   = /[-.~!@#$%^&*()_:<>,?]/

// 应用密码长度
export const FACEPASS_LENGTH  = 6

// 应用密码检测间隔时间
export const VALID_TIMES = [
  { value: 30 * 1000, text:'30秒' },
  { value: 1 * 60 * 1000, text: '1分钟' },
  { value: 3 * 60 * 1000, text: '3分钟' },
  { value: 5 * 60 * 1000, text: '5分钟' },
  { value: 10 * 60 * 1000, text: '10分钟' },
  { value: 0, text: '永不' },
]

// 主题
export const THEMES = [
  { value: 'black', text: '黑暗主题' },
  { value: 'white', text: '纯白主题' },
]

export default {
  LOWERCASE,
  UPPERCASE,
  NUMBER,
  SPECIAL,
  REG_LOWERCASE,
  REG_UPPERCASE,
  REG_NUMBER,
  REG_SPECIAL,
  VALID_TIMES,
  THEMES,
  FACEPASS_LENGTH,
}
