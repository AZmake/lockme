import Const from "../../utils/Const";


const app = getApp()

Page({
  data: {
    theme: '',
    themesIndex: 0,
    themes: Const.THEMES,
  },

  onLoad() {
  },

  onShow() {
    app.pageShow()
    this.setData({ theme: app.setting.theme })
    this.setThemesIndex()
  },

  setThemesIndex() {
    const theme = this.data.theme
    const themes = this.data.themes

    themes.forEach((i, k) => {
      if (i.value == theme) {
        this.setData({
          themesIndex: k,
        })
      }
    })
  },

  changeTheme(e) {
    let themesIndex = e.detail.value
    const themes = this.data.themes
    const theme  = themes[themesIndex].value

    app.setting.changeTheme(theme)
    this.setData({ theme, themesIndex })
  }
})
