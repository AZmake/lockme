import Safe from '../../models/Safe'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    safe: {
      type: Safe,
      value: new Safe,
    },
    theme: {
      type: String,
      value: 'black',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    options: [
      { event: 'copy', icon: "copy" },
      { event: 'edit', icon: "edit" },
      { event: 'del',  icon: "delete"  },
    ],
    contents: [
      { key: 'account',  name: '账号' },
      { key: 'password', name: '密码' },
      { key: 'note',     name: '备注' },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    event(e) {
      const event = e.currentTarget.dataset.event
      this.triggerEvent(`${event}safe`, { safe: this.data.safe })
    },
  }
})
