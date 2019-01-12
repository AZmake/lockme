import Base from '../../utils/Base'
import Const from '../../utils/Const'
import Crypto from '../../utils/Crypto'
import PublicKey from '../../models/PublicKey'
import { PublicKeys } from '../../collections/PublicKeys'

const app = getApp()
const base = new Base

Page({
  data: {
    theme: '',
    step: 1,
    length: Const.FACEPASS_LENGTH,
    facepass: '',
    confirmFacepass: '',
    registered: false,
    error: false,
    publicKey: {},
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
      ['私钥导入', '请在输入框中输入私钥'],
      ['初始化设置完成', '请妥善保管好私钥'],
    ]
  },

  onLoad() {
    // 判断是否已经设置过私钥了
    this.setData({
      theme: app.setting.theme,
      publicKey: app.publicKey,
      registered: !!app.publicKey.value,
      crypto: { publicKey: app.publicKey.value, privateKey: '' },
    })

    // 验证是否已经设置过私钥
    if (app.globalData.crypto
      && app.globalData.facepass
      && app.publicKey.value == app.globalData.crypto.publicKey) {
      this.goToIndex()
    }

    console.log(app.publicKey.value, app.globalData.crypto.publicKey)
  },

  /* 第一步相关 */
  goToTwoStep() {
    this.setData({ step: 2 })
  },
  /* 第一步相关 */

  /* 第二步相关 */
  goBackOneStep() {
    this.setData({ step: 1, facepass: '' })
  },

  goToThreeStep(e) {
    const facepass = e.detail.value

    if (facepass.length !== this.data.length) {
      base._toast('密码长度不正确')
    } else {
      this.setData({ step: 3, facepass })
    }
  },
  /* 第二步相关 */

  /* 第三步相关 */
  goBackTwoStep() {
    this.setData({ step: 2, confirmFacepass: '' })
  },

  goToFourStep(e) {
    const confirmFacepass = e.detail.value
    const facepass = this.data.facepass
    const registered = this.data.registered

    // 验证数据
    if (confirmFacepass.length !== this.data.length) {
      this.setData({ error: true })
      setTimeout(() => this.setData({ error: false }), 2000)
      return base._toast('密码长度不正确')
    } else if (confirmFacepass !== facepass) {
      this.setData({ error: true })
      setTimeout(() => this.setData({ error: false }), 2000)
      return base._toast('两次密码不一致')
    } 
    
    // 进行导入或者生成的跳转
    if (registered) {
      this.setData({ step: 5, confirmFacepass })
    } else {
      this.generatePrivateKey()
      this.setData({ step: 4, confirmFacepass })
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

  goToFinishByGenerate() {
    this.goFinishBefore()
  },
  /* 第四步相关 */

  /* 第五步相关 */
  setPrivateKey(e) {
    const privateKey = e.detail.value
    const crypto = this.data.crypto

    this.setData({
      crypto: {
        ...crypto,
        privateKey,
      }
    })
  },

  goToFinishByImport() {
    const { privateKey, publicKey } = this.data.crypto
    
    if (privateKey == '') {
      return base._toast('私钥不能为空')
    }

    base._loading('校验私钥和公钥是否匹配')
    const check = Crypto.sm2.getPublicKeyFromPrivateKey(privateKey)

    if(check == publicKey) {
      base._toast('导入成功')
      this.goFinishBefore()
    } else {
      this.setData({ error: true })
      base._toast('私钥和公钥不匹配\n请确认私钥是否正确')
      setTimeout(() => this.setData({ error: false }), 2000)
    }
  },

  goToFourStepReset() {
    wx.showModal({
      title: '提示',
      content: '重新生成私钥，将会导致旧私钥相关的密码无法解密',
      success: (res) => {
        if (res.confirm) {
          this.generatePrivateKey()
          this.setData({ step: 4 })
        }
      }
    })
  },

  /* 第五步相关 */

  /* 最后一步相关 */ 
  goFinishBefore() {
    // 初始化数据
    const crypto = this.data.crypto
    const facepass = this.data.facepass
    let publicKey = app.publicKey 

    // 更新公钥
    publicKey.value = crypto.publicKey
    PublicKeys.edit(publicKey)
    app.publicKey = publicKey


    // 设置全局变量
    app.globalData.crypto = crypto
    app.globalData.facepass = facepass

    // 写入本地数据
    wx.setStorageSync('crypto', crypto)
    wx.setStorageSync('facepass', facepass)
    this.setData({ step: 6 })
  },

  goToCryptoIntro() {
    wx.navigateTo({ url: '/page/setting/index?from=init' })
  },

  goToIndex() {
    wx.switchTab({ url: '/pages/index/index' })
  },
  /* 最后一步相关 */ 
})
