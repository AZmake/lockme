import Base from '../../utils/Base'
import Crypto from '../../utils/Crypto'

const app = getApp()
const base = new Base

Page({
  data: {
    theme: '',
    message: '导入数据',
    privateKey: '',
  },

  onShow() {
    this.setData({ theme: app.globalData.theme })
    app.pageShow()
  },

  setPrivateKey(e) {
    this.setData({ privateKey: e.detail.value })
  },

  importPrivateKey() {
    const publicKey = app.publicKey.value
    const privateKey = this.data.privateKey

    if (privateKey == '') {
      return base._toast('私钥不能为空')
    }

    base._loading('校验私钥和公钥是否匹配')

    const check = Crypto.sm2.getPublicKeyFromPrivateKey(privateKey)

    if(check == publicKey) {
      base._toast('导入成功')
      wx.setStorageSync('crypto', { publicKey, privateKey })
      setTimeout(() => wx.switchTab({ url: '/pages/setting/index' }), 2000)
    } else {
      base._toast('私钥和公钥不匹配\n请确认私钥是否正确')
    }
  }
})
