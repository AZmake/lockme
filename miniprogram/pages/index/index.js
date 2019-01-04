import { Passwords } from '../../collections/PasswordsCollecion'

const app = getApp()

Page({
  data: {
    name: '',
    themeName: '',
    passwords: [],
    password: {
      name: '',
      account: '',
      password: '',
      note: '',
      length: 10,
      include: ['lowercase', 'uppercase', 'number', 'special'],
    },
    checkedItems: [
      { value: 'lowercase', name: '小写字母', checked: false },
      { value: 'uppercase', name: '大写字母', checked: false },
      { value: 'number', name: '数字', checked: false },
      { value: 'special', name: '特殊符号', checked: false },
    ],
    isShowPasswordForm: false,
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

  setPasswordName(e) {
    const name = e.detail.value
    const password = this.data.password
    this.setData({password: { ...password, name }})
  },

  setPasswordAccount(e) {
    const account = e.detail.value
    const password = this.data.password
    this.setData({password: { ...password, account }})
  },

  setPasswordNote(e) {
    const note = e.detail.value
    const password = this.data.password
    this.setData({password: { ...password, note }})
  },

  setPasswordInclude(e) {
    const include = e.detail.value
    const password = this.data.password
    this.setData({password: { ...password, include }})
    this.setPasswordRandomValue()
  },

  setPasswordLength(e) {
    const length = parseInt(e.detail.value)
    const password = this.data.password
    
    
    wx.showToast({
      title: `密码长度为${length}`,
      icon: 'none',
      mask: true,
      duration: 2000
    })

    this.setData({
      password: {
        ...password,
        length
      }
    })

    this.setPasswordRandomValue()
  },

  setPasswordRandomValue() {
    const password = this.data.password
    const { include, length } = password
    const value = Passwords.getRandomPassword(include, length)

    if (value !== '') {
      this.setData({
        password: {
          ...password,
          length,
          password: value
        }
      })
    }
  },

  setPasswordValue(e) {
    const value = e.detail.value
    const password = this.data.password
    this.setData({password: { ...password, password: value }})
  },

  showPasswordForm(e) {
    const id = e.currentTarget.dataset.index
    const passwords = this.data.passwords
    let password = this.data.password
    let checkedItems = this.data.checkedItems

    if (id == 0) {
      password = { ...password, name: this.data.name }
    } else {
      password = Passwords.setItem(passwords).find(id)
      password.include = Passwords.getPasswordInclude(password)
      password.length = password.password.length
    }
    
    this.setData({
      name: '',
      password,
      isShowPasswordForm: true,
      checkedItems: checkedItems.map(i => ({
        ...i,
        checked: password.include.includes(i.value),
      })), 
    })

    if (id == 0) {
      this.setPasswordRandomValue()
    }
  },

  hiddenPasswordForm() {
    this.setData({
      isShowPasswordForm: false,
      name: '',
      password: {
        name: '',
        account: '',
        password: '',
        note: '',
        length: 10,
        include: ['lowercase', 'uppercase', 'number', 'special'],
      }
    })
  },

  addOrEditPassword(e) {
    let passwords = this.data.passwords
    let data = this.data.password

    if(!Passwords.setItem(passwords).valid(data)) {
      return;
    }

    if (!data._id) {
      Passwords.setItem(passwords).add(data)
        .then(passwords => this.setData( { passwords, name: '' }))
        .then(() => this.hiddenPasswordForm())
    } else {
      Passwords.setItem(passwords).edit(data)
        .then(passwords => this.setData( { passwords, name: '' }))
        .then(() => this.hiddenPasswordForm())
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
        mask: true,
        duration: 2000
      })
    })
  }

})
