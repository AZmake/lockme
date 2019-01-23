import Base from '../../utils/Base'
import Crypto from '../../utils/Crypto'
import { PublicKeys } from '../../collections/PublicKeys'

const app = getApp()
const base = new Base

Page({
  data: {
    theme: '',
    publicKey: '',
    privateKey: '',
  },

  onLoad() {
    PublicKeys.get().then(item => {
      this.setData({ publicKey: item.value })
    })
  },

  onShow() {
    this.setData({ theme: app.globalData.theme })
    app.pageShow()
  },

  setPrivateKey(e) {
    this.setData({ privateKey: e.detail.value })
  },

  importPrivateKey() {
    const publicKey = this.data.publicKey
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
