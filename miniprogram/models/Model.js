import Base from '../utils/Base'
import Config from '../utils/Config'

export default class Model extends Base {
  constructor(item) {
    super()
    
    wx.cloud.init({
      env: Config.cloud.env,
      traceUser: true,
    })

    this._db = wx.cloud.database()

    this.created_at = item.created_at
    this.updated_at = item.updated_at
  }

  toJson(obj) {
    return {
      ...obj,
      updated_at: (new Date).getTime(),
      created_at: this._id ? this.created_at : (new Date).getTime(),
    }
  }
}
