import Collection from './Collection'
import Setting from '../models/Setting'

export class SettingCollection extends Collection {
  constructor(app = null) {
    super('settings', app)
  }

  get() {
    return this.getToast().then(res => {
      this.items = res.data.map(i => new Setting(i))
      return this.items
    })
  }

  getOne() {
    return this.get().then(res => res.length > 0 ? res[0] : null)
  }

  add(item) {
    return this.addToast(item).then(res => {
      item._id = res._id
      return this.setItems([item, ...this.items]).uniqueById()
    })
  }

  edit(item) {
    return this.editToast(item)
      .then(() => {
        return this.setItems([item, ...this.items]).uniqueById()
      })
  }

  remove(item) {
    return this.removeToast(item)
  }
}

export default new SettingCollection;
