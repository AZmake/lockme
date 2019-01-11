import Base from '../utils/Base'

export default class Model extends Base {
  constructor(item) {
    super()
  
    this.created_at = item.created_at
    this.updated_at = item.updated_at
  }

  toJson(obj) {
    return {
      ...obj,
      updated_at: this._db.serverDate(),
      created_at: this._id ? this.created_at : this._db.serverDate(),
    }
  }
}
