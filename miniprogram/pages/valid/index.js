import Base from '../../utils/Base'
import Const from '../../utils/Const'

const app = getApp()
const base = new Base

Page({
  data: {
    theme: '',
    error: false,
    length: Const.FACEPASS_LENGTH,
  },

  onLoad() { 
    app.pageLoad()
  },

  onShow() {
    app.pageShow()
    this.setData({ theme: app.globalData.theme.name })
  },

  checkedFacepass(e) {
    const value = e.detail.value
    const facepass = app.globalData.facepass

    if (value == facepass) {
      // TODO 计算时间
      wx.navigateBack({ delta: 1 })
    } else {
      this.setData({ error: true })
      base._toast('密码错误')
      setTimeout(() => this.setData({ error: false }), 2000)
    }
  },
})
