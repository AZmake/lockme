import Base from '../../utils/Base'
import Crypto from '../../utils/Crypto'

const app = getApp()
const base = new Base

Page({
  data: {
    theme: '',
    step: 1,
    length: 6,
    password: '',
    confirmPassword: '',
    crypto: {
      publicKey: '',
      privateKey: '',
    },
    message: [
      [],
      ['为了密码安全', '需要进行初始化设置'],
      ['请设置应用密码'],
      ['请重复应用密码'],
      ['私钥生成', '点击复制并进行保存'],
      ['初始化设置完成', '请妥善保管好私钥'],
    ]
  },

  onLoad() {
    this.setData({
      theme: app.globalData.theme.name,
    })
    this.generatePrivateKey()
  },

  /* 第一步相关 */
  goToTwoStep() {
    this.setData({ step: 2 })
  },
  /* 第一步相关 */

  /* 第二步相关 */
  goBackOneStep() {
    this.setData({ step: 1, password: '' })
  },

  goToThreeStep(e) {
    const password = e.detail.value

    if (password.length !== this.data.length) {
      base._toast('密码长度不正确')
    } else {
      this.setData({ step: 3, password })
    }
  },
  /* 第二步相关 */

  /* 第三步相关 */
  goBackTwoStep() {
    this.setData({ step: 2, confirmPassword: '' })
  },

  goToFourStep(e) {
    const confirmPassword = e.detail.value
    const password = this.data.password
    if (confirmPassword.length !== this.data.length) {
      base._toast('密码长度不正确')
    } else if (confirmPassword !== password) {
      base._toast('两次密码不一致')
    } else {
      this.generatePrivateKey()
      this.setData({ step: 4, confirmPassword })
    }
  },
  /* 第三步相关 */

  /* 第四步相关 */
  goBackThereStep() {
    this.setData({ step: 3 })
  },

  copyPrivateKey() {
    wx.setClipboardData({
      data: this.data.crypto.privateKey
    })
  },

  generatePrivateKey() {
    this.setData({
      crypto: Crypto.sm2.generateKeyPairHex()
    })
  },

  goToFiveStep() {
    // TODO 保存数据
    this.setData({ step: 5 })
  },
  /* 第四步相关 */

  /* 第五步相关 */
  goToCryptoIntro() {
    wx.navigateTo({ url: 'setting'})
  },

  /* 第五步相关 */  
  goToIndex() {
    wx.switchTab({ url: '/pages/index/index' })
  },
})
