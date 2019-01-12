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
    this.setting.changeTheme()
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
})
