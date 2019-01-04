import Base from '../utils/Base'

export default class Collection extends Base {
  constructor(name) {
    super()

    this.collectionName = this._cloud.collections[name]    
    this.items = []
  }

  collection() {
    return this._db.collection(this.collectionName)
  }

  setItems(items) {
    this.items = items
    return this
  }

  getItems(items) {
    return this.items
  }

  uniqueById() {
    this.items = this.unique('_id')
    return this.items
  }

  unique(key) {
    let flags = new Set()
    
    this.items = this.items.filter(item => {
      if (flags.has(item[key])) {
          return false;
      }
      flags.add(item[key]);
      return true;
    })

    return this.items
  }

  getToast() {
    this._loading()

    return this.collection().orderBy('created_at', 'desc').get()
      .then(res => this._closeToast(res))
      .catch(error => this._toast('加载失败', error))
  }

  addToast(item) {
    let data = item.toJson()
    return this.collection().add({ data })
      .then(res => this._toast('创建成功', res))
      .catch(error => this._toast('创建失败', error))
  }

  editToast(item) {
    let data = item.toJson()
    
    return this.collection().doc(item._id).update({ data })
      .then(res => this._toast('编辑成功', res))
      .catch(error => this._toast('编辑失败', error))
  }

  removeToast(item) {
    let items = this.items.filter(i => i._id != item._id)
    return this.collection().doc(item._id).remove()
      .then(() => this._toast('删除成功'))
      .then(() => this.items = items)
      .catch(error => {
        console.log(error)
        this._toast('删除失败', error)
      })
  }
}
