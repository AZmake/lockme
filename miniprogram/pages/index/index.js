const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    name: '',
    passwords: [],
  },

  onLoad() {
    this.getPasswords();
  },

  setName(e) {
    this.setData({
      name: e.detail.value
    })

    this.resetPasswordsShow()
  },

  resetPasswordsShow() {
    const name = this.data.name
    let passwords = this.data.passwords

    this.setData({
      passwords: passwords.map(i => {
        i.show = i.name.indexOf(name) !== -1
        return i
      })
    })
  },

  addPassword(e) {
    if (this.data.name === '') {
      wx.showToast({
        title: '账号名不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      let data = {
        name: this.data.name,
        password: '123456',
        public_key: app.globalData.publicKey,
        created_at: new Date(),
        updated_at: new Date(),
      };

      db.collection('passwords')
        .add({ data })
        .then(res => {
          data = {
            ...data,
            _id: res._id,
            show: true,
            _openid: app.globalData.openid,
          }

          let passwords = [data, ...this.data.passwords]

          this.setData({
            name: '',
            passwords: passwords
          })

          this.resetPasswordsShow()

          wx.showToast({
            title: '创建成功',
            duration: 2000
          })
        })
        .catch(error => {
          wx.showToast({
            title: '创建失败',
            icon: 'none',
            duration: 2000
          })
        })
    }
  },

  getPasswords() {
    wx.showLoading({ title: '加载中' })

    db.collection('passwords')
      .orderBy('created_at', 'desc')  
      .get({
        success: (res) => {
          this.setData({
            passwords: res.data.map(i => {
              i.show = true
              return i
            })
          })
          wx.hideLoading()
        }
      })
  },

  copyPassword(e) {
    const _id = e.currentTarget.dataset.index
    const item = this.data.passwords.filter(i => i._id == _id)[0]
    wx.setClipboardData({
      data: item.password,
      success(res) {
        wx.showToast({
          title: '密码已复制',
          duration: 2000
        })
      }
    })
  },

  delPassword(e) {
    const _id = e.currentTarget.dataset.index

    db.collection('passwords')
      .doc(_id)
      .remove()
      .then(() => {
        this.setData({
          passwords: this.data.passwords.filter(i => i._id != _id)
        })

        wx.showToast({
          title: '删除成功',
          duration: 2000
        })
      })
      .catch(error => {
        wx.showToast({
          title: '删除失败',
          icon: 'none',
          duration: 2000
        })
        console.error(error)
      })
  }
})
