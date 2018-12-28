import config from 'config'

App({
  onLaunch() {
    
    // TODO 增加提示页面
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    }

    this.globalData = {}

    wx.cloud.init({
      env: config.cloud.env,
      traceUser: true,
    })

    // 设置 openid
    wx.cloud.callFunction({
      name: 'login',
      complete: res => this.globalData.openid = res.result.openid,
    })

    // TODO 设置 publickey
    this.globalData.publicKey = 'pushmetop'
    this.globalData.privateKey = 'pushmetop'

    // 设置数据库
    this.globalData.collections = config.cloud.collections
  },
})
