import { Settings } from './collections/Settings'

App({
  onLaunch() {
    // GlobalData 初始化
    this.globalData = {}

    // 页面数据初始化
    this.globalData.crypto = wx.getStorageSync('crypto')
    this.globalData.facepass = wx.getStorageSync('facepass')

    // 判断是否有个人信息，诺无则进行创建
    Settings.init().then(setting => {
      this.setting = setting
    })
  },

  pageLoad() {
    this.isInit()
  },

  pageShow() {
    this.setting.changeTheme()
  },

  isInit() {
    if (!this.globalData.crypto || !this.globalData.facepass) {
      wx.redirectTo({ url: '/pages/init/index' })
    }
  },
})
