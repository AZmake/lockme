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

  add(item, success, error, close) {
    return this.addToast(item, success, error, close).then(res => {
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

  exportData() {
    this.get().then(items => {
      let data = JSON.stringify(items.map(item => item.toData()))
      wx.setClipboardData({ data })
    })
  }

  importData(data) {
    return new Promise((resolve, reject) => {
      let items

      try {
        items = JSON.parse(data)
      } catch (e) {
        reject(new Error('导入的数据有误'));
      }

      // 简单的数组检查
      if (!Array.isArray(items)) {
        reject(new Error('导入的数据不是数组'));
      } 

      // 简单的数据检查
      items.forEach(item => {
        if (item.name === '') {
          reject(new Error('导入的数据名称不能为空'))
        }
    
        if (item.password === '') {
          reject(new Error('导入的数据密码不能为空'))
        }
      })

      // 创建数据
      this.get().then(oldItems => {
        items.forEach(item => {
          item = new Safe(item)
          
          let exist = oldItems.filter(i => { 
            return i.password == item.password
              && i.name == i.name
          }).length != 0

          let hasSomeName = oldItems.filter(i => {
            return i.name === item.name
          }).length != 0

          if (hasSomeName) {
            item.name = item.name + (new Date).getTime()
          }

          if (!exist) {
            this.add(item, '', '', true).then(res => oldItems = res)
          }
        })
      }).then((res) => resolve(res))

    })
  }
}

export default SafeCollection
export let Safes = new SafeCollection
