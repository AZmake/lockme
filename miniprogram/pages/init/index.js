import Base from '../../utils/Base'

const app = getApp()
const base = new Base

Page({
  data: {
    theme: '',
    step: 1,
    length: 6,
    password: '',
    confirmPassword: '',
  },

  onShow() {
    app.globalData.changeTheme()
    this.setData({ theme: app.globalData.theme.name })
  },

  goToTwoStep() {
    this.setData({ step: 2 })
  },

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
      this.setData({ step: 4, confirmPassword })
    }
  }
})
