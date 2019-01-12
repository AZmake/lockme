import Model from './Model'
import Const from '../utils/Const';

export default class Setting extends Model {
  constructor(item = {}, app = null) {
    super(item, app)

    this._id = item._id || null
    this.theme = item.theme || this._globalData.defaultTheme
    this.validTime = item.validTime || Const.VALID_TIME[1].value
    
    wx.checkIsSupportSoterAuthentication({
      success: (res) => {
        let support = res.supportMode.includes('fingerPrint')
        this.supportAuthentication = support
        this.authentication = support ? (item.authentication || false) : false
      }
    })
  }

  toJson() {
    return super.toJson({
      theme: this.theme,
      validTime: this.validTime,
      authentication: this.authentication,
      supportAuthentication: this.supportAuthentication,
    })
  }
}
