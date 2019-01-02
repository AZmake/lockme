import { Passwords } from '../../collections/PasswordsCollecion'

const app = getApp()

Page({
  data: {
    name: '',
    themeName: '',
    passwords: [],
  },

  onLoad() {
    this.getPasswords()
  },

  onShow() {
    this.setData({ themeName: app.globalData.themeName })
  },

  setName(e) {
    const name = e.detail.value
    let passwords = this.data.passwords
    this.setData({
      name,
      passwords: passwords.map(i => {
        i.show = i.name.indexOf(name) !== -1
        return i
      })
    })
  },

  toggleShowPasswordDesc(e) {
    const id = e.currentTarget.dataset.index
    const passwords = this.data.passwords
    Passwords.setItem(passwords).toggleShowDesc(id)
      .then(passwords => this.setData( { passwords }))
  },

  addPassword(e) {
    let passwords = this.data.passwords
    let data = {
      name: this.data.name,
      account: '15311111111',
      password: '123456',
      note: '微信密码',
      public_key: app.globalData.publicKey,
    }

    if(Passwords.setItem(passwords).valid(data)) {
      Passwords.setItem(passwords).add(data)
        .then(passwords => this.setData( { passwords, name: '' }))
    }
  },

  getPasswords() {
    Passwords.get()
      .then(passwords => this.setData({ passwords }))
  },

  delPassword(e) {
    const id = e.currentTarget.dataset.index
    const passwords = this.data.passwords

    wx.showModal({
      title: '提示',
      content: '确认删除',
      success: res => res.cancel ||
        Passwords.setItem(passwords).remove(id)
          .then(passwords => this.setData({ passwords }))
    })
  },

  copyPassword(e) {
    const id = e.currentTarget.dataset.index
    const passwords = this.data.passwords
    const item = Passwords.setItem(passwords).find(id)

    wx.setClipboardData({
      data: item.password,
      success: () => wx.showToast({
        title: '密码已复制',
        duration: 2000
      })
    })
  }

})
