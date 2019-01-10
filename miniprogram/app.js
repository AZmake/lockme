import Config from './utils/Config'

App({
  onLaunch() {
    
    // TODO 增加提示页面
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    }

    // 初始化云函数
    wx.cloud.init({
      env: Config.cloud.env,
      traceUser: true,
    })

    // GlobalData 初始化
    this.globalData = { ...Config }

    // 设置 openid
    wx.cloud.callFunction({
      name: 'login',
      complete: res => this.globalData.openid = res.result.openid,
    })

    // 页面数据初始化
    this.changeTheme(Config.themeName)
    this.globalData.crypto = wx.getStorageSync('crypto')
    this.globalData.facepass = wx.getStorageSync('facepass')
  },

  pageLoad() {
    this.isInit()
  },

  pageShow() {
    this.changeTheme()
  },

  isInit() {
    if (!this.globalData.crypto || !this.globalData.facepass) {
      wx.redirectTo({ url: '/pages/init/index', success:console.log, fail:console.error })
    }
  },

  changeTheme(name) {
    if(name) {
      this.globalData.theme = this.globalData.themes[name]
    }

    this.globalData.theme.items.forEach(i => wx.setTabBarItem(i))
    wx.setTabBarStyle(this.globalData.theme.tabBarStyle)
    wx.setNavigationBarColor(this.globalData.theme.navigationBar)
  },
})
