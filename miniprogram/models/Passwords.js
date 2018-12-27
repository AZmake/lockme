import BaseModel from './Model'

class Model extends BaseModel {
  constructor() {
    super('passwords')
  }

  get() {
    return this.getToast().then(res => {
      return res.data.map(i => {
        i.show = true
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
        return i
      })
    })
  }

  remove(id) {
    return this.removeToast(id)
      .then(() => this.items.filter(i => i._id != id))
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

export const Passwords = new Model;
export default Model
