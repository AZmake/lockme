const app = getApp()

Page({
  data: {
    themeName: '',
    indexTheme: 0,
    themes: [],
  },

  onLoad: function (options) {
    this.setData({
      themeName: app.globalData.themeName,
      themes: Object.keys(app.globalData.themes),
    })
  },

  onShow() {
    this.setData({ themeName: app.globalData.themeName })
  },

  changeTheme(e) {
    let indexTheme = e.detail.value
    let themeName = this.data.themes[indexTheme]
    app.globalData.themeName = themeName
    this.setData({ themeName, indexTheme })
  }
})
