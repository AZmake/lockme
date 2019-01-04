import Const from '../utils/Const'
import Model from './Model'

const rules = [
  { key: 'lowercase', reg: Const.REG_LOWERCASE, value: Const.LOWERCASE },
  { key: 'uppercase', reg: Const.REG_UPPERCASE, value: Const.UPPERCASE },
  { key: 'number',    reg: Const.REG_NUMBER,    value: Const.NUMBER    },
  { key: 'special',   reg: Const.REG_SPECIAL,   value: Const.SPECIAL   },
]

export default class Safe extends Model {
  constructor(item = {}) {
    super(item)

    this._id = item._id || null
    this.show = false
    this.name = item.name || ''
    this.note = item.note || ''
    this.account = item.account || ''
    this.publicKey = item.publicKey || ''
    this.encryptedPassword = item.encryptedPassword || null
    this.password = this.decrypt(this.encryptedPassword)
    this.length = this.password.length ? this.password.length : 10;
    this.elements = rules.map(i => this.password.match(i.reg) || !this.password ? i.key : '')

    if (!this._id) {
      this.generate()
    }
  }
  
  decrypt(password) {
    return password ? password : ''
  }

  encrypt(password) {
    return password
  }

  toJson() {
    return {
      name: this.name,
      note: this.note,
      account: this.account,
      publicKey: this.publicKey,
      encryptedPassword: this.encryptedPassword,
      create_at: this.created_at,
      update_at: this._db.serverDate(),
    }
  }

  generate() {
    if (this.elements.length == 0) {
      return this.toast('请至少选择一个类型');
    }

    if (this.length < 4) {
      return this.toast('长度至少为4位');
    }

    let length = 0
    let origin = ''
    let password = ''
    let random = i => i[Math.floor(Math.random() * i.length)]

    rules.forEach(i => {
      if(this.elements.includes(i.key)) {
        length++
        origin += i.value
        password += random(i.value)
      }
    })

    length = this.length - length
    for(let i = 0; i < length; i++) {
      password += random(origin)
    }

    this.password = password
    this.encryptedPassword = this.encrypt(password)
    this.length = password.length
  }
}
