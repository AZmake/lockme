export default class {
  constructor() {
    this._app = getApp()
    this._globalData = this._app.globalData
    this._cloud = this._globalData.cloud
    this._hasToast = false
    this._hasLoading = false
    this._db = wx.cloud.database()
  }

  _toast(i, res) {
    let origin = {
      title: '',
      icon: 'none',
      mask: true,
      duration: 2000
    }
    
    origin = "string" === typeof i
      ? { ...origin, title: i }
      : { ...origin, ...i }

    this._closeToast()
    wx.showToast(origin)
    this._hasToast = true
    return res ? res : ''
  }

  _loading(i, res) {
    this._closeToast()
    wx.showLoading({ title: i ? i : '加载数据' })
    this._hasLoading = true
    return res ? res : ''
  }

  _closeToast(res) {
    this._hasToast && wx.hideToast()
    this._hasLoading && wx.hideLoading()
    return res ? res : ''
  }
}
