import Model from './Model'

export default class PublicKey extends Model {
  constructor(item = {}) {
    super(item)

    this._id = item._id
    this.value = item.value
  }

  toJson() {
    return super.toJson({
      value: this.value,
    })
  }
}
