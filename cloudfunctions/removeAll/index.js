// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()

exports.main = async (event, context) => {
  const name = event.name || ''
  const where = event.where || {}
  const openid = event.openid || ''
  
  return await db
    .collection(name)
    .where({ _openid: openid, ...where })
    .remove()
}