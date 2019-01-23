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
        base._toast('导入成功')
        setTimeout(() => wx.switchTab({ url: '/pages/setting/index' }), 2000)
      })
      .catch((e) => base._toast(e.message))
  }
})
