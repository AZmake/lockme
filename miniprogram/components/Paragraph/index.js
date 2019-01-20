Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '标题',
    },
    content: {
      type: String,
      value: '内容',
    },
    theme: {
      type: String,
      value: 'black',
    },
    istextarea: {
      type: Boolean,
      value: false
    },
    placeholder: {
      type: String,
      value: '',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setValue(e) {
      const value = e.detail.value
      this.setData({value: value })
      this.triggerEvent(`setvalue`, { value })
    },
    tap() {
      this.triggerEvent(`click`)
    }
  }
})
