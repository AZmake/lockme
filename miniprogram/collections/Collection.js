export default class {
  constructor(name) {
    this.collections = getApp().globalData.cloud.collections
    this.db = wx.cloud.database()
    this.collectionName = this.collections[name]
    this.items = []
  }

  collection() {
    return this.db.collection(this.collectionName)
  }

  setItem(items) {
    this.items = items
    return this
  }

  getToast() {
    wx.showLoading({ title: '加载数据' })

    return this.collection()
      .orderBy('created_at', 'desc')
      .get()
      .then(res => {
        wx.hideLoading()
        return res
      })
      .catch(error => {
        wx.hideLoading()
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          mask: true,
          duration: 2000
        })
        return error
      })
  }

  addToast(data) {
    data = {
      ...data,
      created_at: this.db.serverDate(),
      updated_at: this.db.serverDate(),
    }
    return this.collection()
      .add({ data })
      .then(res => {
        wx.showToast({
          title: '创建成功',
          mask: true,
          duration: 2000,
        })
        return res
      })
      .catch(error => {
        wx.showToast({
          title: '创建失败',
          icon: 'none',
          mask: true,
          duration: 2000
        })
        return error
      })
  }

  removeToast(id) {
    return this.collection()
      .doc(id)
      .remove()
      .then(res => {
        wx.showToast({
          title: '删除成功',
          mask: true,
          duration: 2000
        })
        return res
      }).catch(error => {
        wx.showToast({
          title: '删除失败',
          icon: 'none',
          mask: true,
          duration: 2000
        })
        return error
      })
  }
}
