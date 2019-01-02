import Collection from './Collection'

class PasswordsCollecion extends Collection {
  constructor() {
    super('passwords')
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
    return this.addToast(data).then(res => {
      let _id = res._id
      data = { ...data, _id }
      return [data, ...this.items].map(i => {
        i.show = true
        i.showDesc = false
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
        duration: 2000
      })

      return false
    }

    let sameName = i => i.name === item.name

    if (this.items.filter(sameName).length > 0) {
      wx.showToast({
        title: '名称已存在',
        icon: 'none',
        duration: 2000
      })

      return false
    }

    return true
  }
}

export const Passwords = new PasswordsCollecion;
export default PasswordsCollecion
