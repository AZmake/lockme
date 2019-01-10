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

    // 更换主题方法
    this.globalData.changeTheme = function (name) {
      if(name) {
        this.theme = this.themes[name]
      }

      this.theme.items.forEach(i => wx.setTabBarItem(i))
      wx.setTabBarStyle(this.theme.tabBarStyle)
      wx.setNavigationBarColor(this.theme.navigationBar)
    }

    // TODO 设置 publickey
    this.globalData.publicKey = 'pushmetop'
    this.globalData.privateKey = 'pushmetop'
    this.globalData.changeTheme(Config.themeName)
    this.globalData.crypto = wx.getStorageSync('crypto')
    this.globalData.facepass = wx.getStorageSync('facepass')

    if (!this.globalData.crypto || !this.globalData.facepass) {
      wx.navigateTo({ url: '/page/init/index' })
    }
  }
})
