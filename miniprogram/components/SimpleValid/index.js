let baseKeyboard = [
  [
    { text: '1', value: '1', type: 'button' }, 
    { text: '2', value: '2', type: 'button' }, 
    { text: '3', value: '3', type: 'button' },
  ],
  [
    { text: '4', value: '4', type: 'button' }, 
    { text: '5', value: '5', type: 'button' }, 
    { text: '6', value: '6', type: 'button' },
  ],
  [
    { text: '7', value: '7', type: 'button' }, 
    { text: '8', value: '8', type: 'button' },
    { text: '9', value: '9', type: 'button' }, 
  ],
  [
    { text: '返回', value: '返回', type: 'cancel' },
    { text: '0', value: '0', type: 'button' },
    { text: '删除', value: '删除', type: 'delete' },
  ],
]

let nextKeyboard = [
  ...baseKeyboard,
  [
    { text: '下一步', value: '下一步', type: 'confirm' }, 
  ],
]

let confirmKeyboard = [
  ...baseKeyboard,
  [
    { text: '确认', value: '确认', type: 'confirm' }, 
  ],
]

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    length: {
      type: Number,
      value: 6,
    },
    theme: {
      type: String,
      value: 'black',
    },
    focus: {
      type: Boolean,
      value: true,
    },
    ispassword: {
      type: Boolean,
      value: false,
    },
    message: {
      type: String,
      value: '请输入密码',
    },
    error: {
      type: Boolean,
      value: false,
    },
    native: {
      type: Boolean,
      value: false,
    },
    type: {
      type: String,
      value: 'baseKeyboard'
    },
    value: {
      type: String,
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    keyboard: {
      baseKeyboard,
      nextKeyboard,
      confirmKeyboard,
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setFocus() {
      this.setData({ focus: !this.data.focus })
    },
    setValue(e) {
      this.setData()
    },
    event(e) {
      const value = this.data.value
      const type = e.currentTarget.dataset.type

      switch(type) {
        case 'none': break;
        case 'button': this.setButton(e); break;
        case 'delete': this.setDelete(e); break;
        default: this.triggerEvent(`${type}`, { value })
      }
    },

    setButton(e) {
      const length = this.data.length
      const value = this.data.value
      const char  = e.currentTarget.dataset.value

      if (value.length <= length) {
        this.setData({ value: value + char })
      }
    },

    setDelete(e) {
      const value = this.data.value
      this.setData({ value: value.substr(0, value.length - 1) })
    },
  }
})
