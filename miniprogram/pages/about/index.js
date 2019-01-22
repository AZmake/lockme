import Base from '../../utils/Base'

const app = getApp()
const base = new Base

Page({
  data: {
    theme: '',
    items: [
      {
        title: '简介',
        content: '一群热爱分享代码和生活的小伙伴',
      },
      {
        title: '源码仓库',
        content: 'https://github.com/pushmetop/lockme',
      },
      {
        title: '微信号码',
        content: 'lovefornuo',
      },
      {
        title: '微信公众号',
        content: 'PushMeTop',
      },
      {
        title: 'QQ群',
        content: '857015998'
      },
    ]
  },

  onShow() {
    this.setData({ theme: app.globalData.theme })
    app.pageShow()
  },

  copyContent(e) {
    let index = e.currentTarget.dataset.index
    wx.setClipboardData({ data: this.data.items[index].content })
  },
})
