const app = getApp()

Page({
  data: {
    theme: '',
    indexTheme: 0,
    themes: [],
  },

  onLoad() {
    app.pageShow()
    this.setData({
      theme: app.globalData.theme.name,
      themes: Object.keys(app.globalData.themes),
    })
  },

  onShow() {
    app.pageShow()
    this.setData({ theme: app.globalData.theme })
  },

  changeTheme(e) {
    let indexTheme = e.detail.value
    let theme = this.data.themes[indexTheme]

    app.changeTheme(theme)
    this.setData({ theme, indexTheme })
  }
})
