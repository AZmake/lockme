const app = getApp()

Page({
  data: {
    theme: '',
    team: {
      title: '简介',
      content: '一群热爱分享代码和生活的小伙伴'
    },
    github: {
      title: '源码仓库',
      content: 'https://github.com/pushmetop/lockme'
    }
  },

  onShow() {
    this.setData({ theme: app.globalData.theme })
    app.pageShow()
  },

  copyGithubAddress() {
    wx.setClipboardData({ data: this.data.github.content })
  }
})
