import Base from '../../utils/Base'
import Crypto from '../../utils/Crypto'
import { Safes } from '../../collections/Safes'
import { PublicKeys } from '../../collections/PublicKeys'


const app = getApp()
const base = new Base

Page({
  data: {
    theme: '',
    publicKey: '',
    privateKey: '',
    isChange: false,
  },

  onLoad() {
    this.setData({
      crypto: Crypto.sm2.generateKeyPairHex()
    })

    PublicKeys.get().then(item => {
      this.setData({ publicKey: item.value })
    })
  },

  onShow() {
    this.setData({
      theme: app.globalData.theme,
    })
    app.pageShow()
  },

  setPrivateKey(e) {
    this.setData({ privateKey: e.detail.value })
  },

  changePrivateKey() {
    if(this.data.isChange) {
      base._toast("请保存好新私钥")
    } else if (this.checkPrivateKey()) {
      wx.showModal({
        title: '提示',
        content: '更换私钥后原私钥将失效',
        success: res => res.cancel || this.updateSafes()
      })
    }
  },

  updateSafes() {
    const crypto = this.data.crypto

    // 提示
    base._loading("更新中请勿退出")

    // 更新密码
    Safes.get().then(items => {
      let counter = 0

      // 批量更新
      items.forEach((item) => {
        item.crypto = crypto

        // 由于是异步更新，需要等更新完后再存储新私钥
        Safes.edit(item).then(() => {
          counter++
          if(counter == items.length) {
            // 更新公钥
            PublicKeys.get().then(item => {
              item.value = crypto.publicKey
              PublicKeys.edit(item)
            })

            // 更新本地存储
            app.globalData.crypto = crypto
            wx.setStorageSync('crypto', crypto)

            // 提示
            base._toast('私钥已更换成功')
            this.setData({ isChange: true })
          }
        })
      })
    })
  },

  checkPrivateKey() {
    const publicKey = this.data.publicKey
    const privateKey = this.data.privateKey

    if (privateKey == '') {
      return base._toast('原私钥不能为空')
    }

    base._loading('校验原私钥和公钥是否匹配')

    const check = Crypto.sm2.getPublicKeyFromPrivateKey(privateKey)

    if(check == publicKey) {
      wx.hideLoading()
      return true
    } else {
      base._toast('原私钥和公钥不匹配，请确认私钥是否正确')
      return false
    }
  },

  copyNewPrivateKey() {
    wx.setClipboardData({ data: this.data.crypto.privateKey })
  }
})
