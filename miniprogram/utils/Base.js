export default class {
  constructor() {
    this._hasToast = false
    this._hasLoading = false
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
    if(this._hasToast) {
      wx.hideToast()
      this._hasToast = false
    }

    if(this._hasLoading) {
      wx.hideLoading()
      this._hasLoading = false
    }
    return res ? res : ''
  }
}
