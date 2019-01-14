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
      this.isInit()
    })
  },

  pageLoad() {
    this.isInit()
  },

  pageShow() {
    this.changeTheme()
  },

  isInit() {
    const value = this.publicKey.value
    const crypto = this.globalData.crypto
    const facepass = this.globalData.facepass
    
    const routes =  getCurrentPages()

    if (routes.length > 0 && routes[0].route != 'pages/init/index') {
      // 验证是否配置
      // 校验云端的公钥和本地是否一致
      if ((!crypto || !facepass) || (!value && value != crypto.publicKey )) {
        wx.redirectTo({ url: 'pages/init/index' })
      }
    }
  },

  changeTheme(name) {
    name = name || wx.getStorageSync('themeName') || Config.defaultTheme
    this.globalData.theme = name
    let theme = Config.themes[name]
    theme.items.forEach(i => wx.setTabBarItem(i))
    wx.setTabBarStyle(theme.tabBarStyle)
    wx.setNavigationBarColor(theme.navigationBar)
  }
})
