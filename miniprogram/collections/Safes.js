import Collection from './Collection'
import Safe from '../models/Safe'

class SafeCollection extends Collection {
  constructor() {
    super('safes')
  }

  get() {
    return super.getToast().then(res => {
      this.items = res.data.map(i => new Safe(i))
      return this.items
    })
  }

  add(item) {
    return this.addToast(item).then(res => {
      item._id = res._id
      item.show = true
      return this.setItems([item, ...this.items]).uniqueById()
    })
  }

  edit(item) {
    return this.editToast(item)
      .then(() => {
        item.show = true
        return this.setItems([item, ...this.items]).uniqueById()
      })
  }

  remove(item) {
    let items = this.items.filter(i => i._id != item._id)
    return this.removeToast(item)
      .then(() => this.items = items)
  }

  find(_id) {
    return this.items.filter(i => i._id == _id)[0]
  }

  search(keyword) {
    return new Promise((resolve) => {
      resolve(this.items.filter(i => {
        return i.name.indexOf(keyword) !== -1
          || i.account.indexOf(keyword) !== -1
          || i.note.indexOf(keyword) !== -1
      }))
    })
  }

  toggle(item) {
    return new Promise((resolve) => {
      resolve(this.items.map(i => {
        if(i._id == item._id) {
          i.show = !i.show
        }
        return i
      }))
    })
  }

  valid(item) {
    if (item.name === '') {
      return this._toast('名称不能为空', false)
    }

    let sameName = i => i.name === item.name && i._id != item._id

    if (this.items.filter(sameName).length > 0) {
      return this._toast('名称已存在', false)
    }

    if (item.password === '') {
      return this._toast('密码不能为空', false)
    }

    return true
  }
}

export default SafeCollection
export let Safes = new SafeCollection
