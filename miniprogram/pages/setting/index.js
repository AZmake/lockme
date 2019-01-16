import Base from "../../utils/Base"
import Const from "../../utils/Const"
import { Settings } from '../../collections/Settings'

const app = getApp()
const base = new Base

Page({
  data: {
    theme: '',
    themesIndex: 0,
    themes: Const.THEMES,

    validTime: 0,
    validTimesIndex: 0,
    validTimes: Const.VALID_TIMES,
  },

  onLoad() {
  },

  onShow() {
    app.pageShow()

    this.setData({
      theme: app.globalData.theme,
      validTime: app.setting.validTime
    })

    this.setThemesIndex()
    this.setValidTimesIndex()
  },

  setValidTimesIndex() {
    const validTime = this.data.validTime
    const validTimes = this.data.validTimes

    validTimes.forEach((i, k) => {
      if (i.value == validTime) {
        this.setData({ validTimesIndex: k })
      }
    })
  },

  setThemesIndex() {
    const theme = this.data.theme
    const themes = this.data.themes

    themes.forEach((i, k) => {
      if (i.value == theme) {
        this.setData({ themesIndex: k })
      }
    })
  },

  changeTheme(e) {
    let themesIndex = e.detail.value
    const themes = this.data.themes
    const theme  = themes[themesIndex].value

    // 保存数据
    app.changeTheme(theme)
    base._toast('设置成功')

    // 更新数据
    this.setData({ theme, themesIndex })
  },

  changeValidTime(e) {
    let validTimesIndex = e.detail.value
    const validTimes = this.data.validTimes
    const validTime = validTimes[validTimesIndex].value

    // 保存数据
    app.setting.validTime = validTime
    Settings.edit(app.setting)

    // 更新数据
    this.setData({ validTime, validTimesIndex })
  }
})
