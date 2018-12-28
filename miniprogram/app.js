import config from 'config'

App({
  onLaunch() {
    
    // TODO 增加提示页面
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    }

    // 初始化云函数
    wx.cloud.init({
      env: config.cloud.env,
      traceUser: true,
    })

    // GlobalData 初始化
    this.initGlobalData() 

    // 设置 openid
    wx.cloud.callFunction({
      name: 'login',
      complete: res => this.globalData.openid = res.result.openid,
    })

    // 更换主题方法
    this.globalData.changeTheme = function () {
      this.theme.items.forEach(i => wx.setTabBarItem(i))
      wx.setTabBarStyle(this.theme.tabBarStyle)
      wx.setNavigationBarColor(this.theme.navigationBar)
    }

    // TODO 设置 publickey
    this.globalData.publicKey = 'pushmetop'
    this.globalData.privateKey = 'pushmetop'
    this.globalData.themeName = config.themeName
  },

  initGlobalData() {
    this.globalData = { ...config }

    Object.defineProperty(this.globalData, 'themeName', {
      get: function () {
        this.changeTheme()
        return this.realThemeName
      },
      set: function (name) {
        this.realThemeName = name
        this.theme = this.themes[name]
        this.changeTheme()
      }
    })
  }
})
