import Safes from '../../collections/Safes'
import Safe from '../../models/Safe'

const app = getApp()

Page({
  data: {
    theme: '',
    keyword: '',
    safes: [],
    safe: new Safe(),
    form: {
      show: false,
      checks: [
        { value: 'lowercase', name: '小写字母', checked: false },
        { value: 'uppercase', name: '大写字母', checked: false },
        { value: 'number', name: '数字', checked: false },
        { value: 'special', name: '特殊符号', checked: false },
      ],
    },
  },

  onShow() {
    this.setData({ theme: app.globalData.themeName })
    Safes.get().then(safes => this.setData({ safes }))
  },

  setKeyword(e) {
    const keyword = e.detail.value
    this.setData({ keyword, })
    Safes.search(keyword).then(safes => this.setData({ safes }))
  },

  setFormProp(e) {
    let prop = e.currentTarget.dataset.prop
    let safe = this.data.safe
    safe[prop] = e.detail.value
    
    if (['length'].includes(prop)) {
      safe._toast(`密码长度为${e.detail.value}`)
    }

    if (['elements', 'length'].includes(prop)) {
      safe.generate()
    }

    this.setData({ safe: safe })
  },

  showForm(e) {
    const index = e.currentTarget.dataset.index
    const safe = index === -1
      ? new Safe({ name: this.data.keyword })
      : this.data.safes[index]

    const checks = this.data.form.checks.map(i => ({
        ...i,
        checked: safe.elements.includes(i.value),
    }))

    this.setData({
      safe,
      keyword: '',
      form: { show: true, checks: checks }
    })
  },

  hiddenForm() {
    const form = this.data.form
    this.setData({
      safe: new Safe(),
      form: { ...form, show: false }
    })
  },

  sumbitForm(e) {
    const safe = this.data.safe
    if(!Safes.valid(safe)) {
      return 
    }

    let option = safe._id ? 'edit' : 'add'
    
    Safes[option](safe)
      .then(safes => this.setData( { safes }))
      .then(() => this.hiddenForm())
  },

  delSafe(e) {
    const index = e.currentTarget.dataset.index
    const safe = this.data.safes[index]
    wx.showModal({
      title: '提示',
      content: '确认删除',
      success: res => res.cancel ||
        Safes.remove(safe)
          .then(safes => this.setData({ safes }))
    })
  },

  copySafe(e) {
    const index = e.currentTarget.dataset.index
    const safe = this.data.safes[index]

    wx.setClipboardData({
      data: safe.password,
      success: () => Safes._toast('密码已复制')
    })
  },

  toggleSafe(e) {
    const index = e.currentTarget.dataset.index
    const safe = this.data.safes[index]
    Safes.toggle(safe).then(safes => this.setData({ safes }))
  },

})
