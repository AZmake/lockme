import Base from '../utils/Base'

export default class Model extends Base {
  constructor(item) {
    super()
  
    this.created_at = item.created_at || this._db.serverDate()
    this.updated_at = item.created_at || this._db.serverDate()
  }

  toJson() {
    return {}
  }
}
