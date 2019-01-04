import Collection from './Collection'

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMBER = '0123456789'
const SPECIAL = `-.~!@#$%^&*()_:<>,?`

class PasswordsCollecion extends Collection {
  

  constructor() {
    super('passwords')
  }

  getOneRandomChar(origin) {
    return origin[Math.floor(Math.random() * origin.length)]
  }

  getPasswordInclude(password) {
    let value = password.password
    let include = []

    if(value.match(/[0-9]/i)) {
      include.push('number')
    }

    if(value.match(/[a-z]/i)) {
      include.push('lowercase')
    }

    if(value.match(/[A-Z]/i)) {
      include.push('uppercase')
    }

    if(value.match(/[-.~!@#$%^&*()_:<>,?]/i)) {
      include.push('special')
    }

    return include
  }

  getRandomPassword(range, length) {
    let origin = ''
    let target = ''
    let rangeLength = 0

    length = parseInt(length)
    
    if (range.length === 0) {
      wx.showToast({
        title: '请至少选择一个类型',
        icon: 'none',
        mask: true,
        duration: 2000
      })
      return ''
    }

    if (length === 0) {
      wx.showToast({
        title: '长度至少为4位',
        icon: 'none',
        mask: true,
        duration: 2000
      })

      return ''
    }

    if (range.includes('lowercase')) {
      rangeLength++
      origin += LOWERCASE
      target += this.getOneRandomChar(LOWERCASE)
    }

    if (range.includes('uppercase')) {
      rangeLength++
      origin += UPPERCASE
      target += this.getOneRandomChar(UPPERCASE)
    }

    if (range.includes('number')) {
      rangeLength++
      origin += NUMBER
      target += this.getOneRandomChar(NUMBER)
    }

    if (range.includes('special')) {
      rangeLength++
      origin += SPECIAL
      target += this.getOneRandomChar(SPECIAL)
    }

    for(let i = 0; i < length - rangeLength; i++) {
      target += this.getOneRandomChar(origin)
    }

    return target
  }

  get() {
    return super.getToast().then(res => {
      return res.data.map(i => {
        i.show = true
        i.showDesc = false
        return i
      })
    })
  }

  add(data) {
    let password = {
      name: data.name,
      account: data.account,
      note: data.note,
      password: data.password,
    }

    return this.addToast(password).then(res => {
      let _id = res._id
      password = { ...password, _id }
      return [password, ...this.items].map(i => {
        i.show = true
        i.showDesc = false
        return i
      })
    })
  }

  edit(data) {
    let id = data._id;
    let password = {
      name: data.name,
      account: data.account,
      note: data.note,
      password: data.password,
      created_at: data.created_at,
    }
    
    return this.editToast(id, password).then(res => {
      let items = this.items.filter(i => i._id != id)
      return [password, ...items].map(i => {
        i.show = true
        i.showDesc = i._id == id
        return i
      })
    })
  }

  remove(id) {
    return this.removeToast(id)
      .then(() => this.items.filter(i => i._id != id))
  }

  toggleShowDesc(id) {
    return new Promise((resolve) => {
      resolve(this.items.map(i => {
        if(i._id === id) {
          i.showDesc = !i.showDesc
        }
        return i
      }))
    })
  }

  find(id) {
    return this.items.filter(i => i._id == id)[0]
  }

  valid(item) {
    if (item.name === '') {
      wx.showToast({
        title: '名称不能为空',
        icon: 'none',
        mask: true,
        duration: 2000
      })

      return false
    }

    let sameName = i => i.name === item.name && i._id != item._id

    if (this.items.filter(sameName).length > 0) {
      wx.showToast({
        title: '名称已存在',
        icon: 'none',
        mask: true,
        duration: 2000
      })

      return false
    }

    if (item.password === '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        mask: true,
        duration: 2000
      })

      return false
    }

    return true
  }
}

export const Passwords = new PasswordsCollecion;
export default PasswordsCollecion
