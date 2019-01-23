import Collection from './Collection'
import PublicKey from '../models/PublicKey'

class PublicKeyCollection extends Collection {
  constructor() {
    super('publicKeys')
  }

  get() {
    return this.getToast().then(res => {
      this.items = res.data.map(i => new PublicKey(i))
      return this.items.length > 0 ? this.items[0] : null
    })
  }

  add(item) {
    return this.addToast(item, '', '', true)
      .then(res => {
        item._id = res._id
        return item
      })
  }

  edit(item) {
    return this.editToast(item, '', '', true)
  }

  remove(item) {
    return this.removeToast(item)
  }
}

export let PublicKeys = new PublicKeyCollection
export default PublicKeyCollection
