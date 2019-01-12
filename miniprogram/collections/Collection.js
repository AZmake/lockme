import Base from '../utils/Base'
import Config from '../utils/Config'

export default class Collection extends Base {
  constructor(name) {
    super()
    
    this.items = []
    this.collectionName = Config.cloud.collections[name]

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    }

    wx.cloud.init({
      env: Config.cloud.env,
      traceUser: true,
    })

    this._db = wx.cloud.database()
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

  getToast(item = {}, success = "加载数据", error = "加载失败", close = false) {
    if (!close) {
      this._loading(success)
    }

    return this.collection().orderBy('created_at', 'desc').get()
      .then(res => close ? res : this._closeToast(res))
      .catch(err => close ? error : this._toast(error, err))
  }

  addToast(item, success = "创建成功", error = "创建失败", close = false) {
    let data = item.toJson()
    return this.collection().add({ data })
      .then(res => close ? res : this._toast(success, res))
      .catch(err => close ? error : this._toast(error, err))
  }

  editToast(item, success = "编辑成功", error = "编辑失败", close = false) {
    let data = item.toJson()
    
    return this.collection().doc(item._id).update({ data })
      .then(res => close ? res : this._toast(success, res))
      .catch(err => close ? error : this._toast(error, err))
  }

  removeToast(item, success = "删除成功", error = "删除失败", close = false) {
    
    return this.collection().doc(item._id).remove()
      .then(res => close ? res : this._toast(success, res))
      .catch(err => close ? error : this._toast(error, err))
  }

  removeAll(openid) {
    return wx.cloud.callFunction({
      name: 'removeAll',
      data: { openid, name: this.collectionName }
    })
  }
}
