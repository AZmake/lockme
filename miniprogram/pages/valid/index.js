import Base from '../../utils/Base'
import Const from '../../utils/Const'

const app = getApp()
const base = new Base

Page({
  data: {
    theme: '',
    delay: 0,
    error: false,
    length: Const.FACEPASS_LENGTH,
  },

  onLoad(options) {
    this.setData({ delay: parseInt(options.validTime) })
  },

  onShow() {
    this.setData({ theme: app.globalData.theme })
    app.pageShow()
  },

  checkedFacepass(e) {
    const value = e.detail.value
    const facepass = app.globalData.facepass

    if (value == facepass) {
      const delay = this.data.delay
      const validEndAt = (new Date).getTime() + delay
      wx.setStorageSync('validEndAt', validEndAt)

      wx.navigateBack({ delta: 1 })
    } else {
      this.setData({ error: true })
      base._toast('密码错误')
      setTimeout(() => this.setData({ error: false }), 2000)
    }
  },
})
