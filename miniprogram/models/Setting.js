import Model from './Model'
import Const from '../utils/Const'

export default class Setting extends Model {
  constructor(item = {}) {
    super(item)

    this._id = item._id || null
    this.validTime = this._id ? parseInt(item.validTime) : Const.VALID_TIMES[1].value
    this.authentication = item.authentication || false
    
    // 获取 openid
    if (this._id) {
      this.openid = item._openid
    } else {
      wx.cloud.callFunction({
        name: 'login',
        complete: res => this.openid = res.result.openid,
      })
    }
  }

  toJson() {
    return super.toJson({
      validTime: parseInt(this.validTime),
      authentication: this.authentication,
      supportAuthentication: this.supportAuthentication,
    })
  }
}
