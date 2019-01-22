import Config from './utils/Config'
import { Settings } from './collections/Settings'
import { PublicKeys } from './collections/PublicKeys'

App({
  onLaunch() {
    // GlobalData 初始化
    this.globalData = {}

    // 页面数据初始化
    this.globalData.crypto = wx.getStorageSync('crypto')
    this.globalData.facepass = wx.getStorageSync('facepass')
    this.changeTheme(wx.getStorageSync('themeName') || Config.defaultTheme)

    // 判断是否有个人信息，诺无则进行创建
    Settings.init().then(setting => {
      this.setting = setting
    })
  },

  onShow() {
    // 校验云端的公钥和本地是否一致
    PublicKeys.init().then(publicKey => {
      this.publicKey = publicKey
    })
  },

  pageShow() {
    // 更新主题
    this.changeTheme()

    // 判断是否初始化
    this.isInit()
  },

  isInit() {
    const crypto = this.globalData.crypto
    const facepass = this.globalData.facepass

    if (!crypto || !facepass ) {
      wx.redirectTo({ url: '/pages/init/index' })
    }
  },

  changeTheme(name) {
    name = name || wx.getStorageSync('themeName') || Config.defaultTheme
    this.globalData.theme = name
    wx.setStorageSync('themeName', name)

    let theme = Config.themes[name]
    theme.items.forEach(i => wx.setTabBarItem(i))
    wx.setTabBarStyle(theme.tabBarStyle)
    wx.setNavigationBarColor(theme.navigationBar)
  }
})
