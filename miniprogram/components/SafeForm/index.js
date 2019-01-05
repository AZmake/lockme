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
    checks: [
      { value: 'lowercase', name: '小写字母', checked: false },
      { value: 'uppercase', name: '大写字母', checked: false },
      { value: 'number', name: '数字', checked: false },
      { value: 'special', name: '特殊符号', checked: false },
    ],
  },

  attached() {
    const safe = new Safe(this.data.safe)
    this.setData({
      safe,
      checks: this.data.checks.map(i => ({
        ...i,
        checked: safe.elements.includes(i.value),
      }))
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setProp(e) {
      let prop = e.currentTarget.dataset.prop
      let safe = this.data.safe
      safe[prop] = e.detail.value
      
      if (['length'].includes(prop)) {
        safe._toast(`密码长度为${e.detail.value}`)
      }
  
      if (['elements', 'length'].includes(prop)) {
        safe.generate()
      }
  
      this.setData({ safe })
    },
    
    event(e) {
      const event = e.currentTarget.dataset.event
      this.triggerEvent(`${event}form`, { safe: this.data.safe })
    },
  }
})
