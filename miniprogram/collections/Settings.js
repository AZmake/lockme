import Collection from './Collection'
import Setting from '../models/Setting'

class SettingCollection extends Collection {
  constructor() {
    super('settings')
  }

  init() {
    return Settings.get().then(item => {
      return new Promise(resolve => {
        item
          ? resolve(item)
          : this.add(new Setting).then(resolve)
      })
    })
  }

  get() {
    return this.getToast().then(res => {
      this.items = res.data.map(i => new Setting(i))
      return this.items.length > 0 ? this.items[0] : null
    })
  }

  add(item) {
    return this.addToast(item).then(res => {
      item._id = res._id
      return item
    })
  }

  edit(item) {
    return this.editToast(item)
  }

  remove(item) {
    return this.removeToast(item)
  }
}

export let Settings =  new SettingCollection
export default SettingCollection
