import Base from '../../utils/Base'
import { Safes } from '../../collections/Safes'

const app = getApp()
const base = new Base

Page({
  data: {
    safesJson: '',
    theme: '',
    message: '导入数据',
  },

  onShow() {
    this.setData({ theme: app.globalData.theme })
    app.pageShow()
  },

  setSafes(e) {
    this.setData({ safesJson: e.detail.value })
  },

  importSafes() {
    base._loading()
    Safes.importData(this.data.safesJson)
      .then(() => {
        wx.showToast({
          title: '导入成功',
          icon: 'none',
          duration: 2000,
          success: () => wx.switchTab({ url: '/pages/index/index' })
        })
      })
      .catch((e) => base._toast(e.message))
  }
})
