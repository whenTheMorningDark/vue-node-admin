/* eslint-disable require-jsdoc */
const express = require('express')
const router = express.Router()
let mysql = require('../config/db')
let {
  Success,
  Error
} = require('../utils/message')

function getAllData(sqlStr) {
  return new Promise((resolve, reject) => {
    let sqlAll = sqlStr
    mysql.query(sqlAll, (err, result) => {
      if (err) {
        resolve([])
      } else {
        resolve(result)
      }
    })
  })
}

router.get(
  '/registerInfo',
  async (req, res) => {
    let pageNo = Number(req.query.page) || 1
    let pageCount = Number(req.query.limit) || 10
    let registerUser = req.query.registerUser
    let registerSex = req.query.registerSex
    let registerPhone = req.query.registerPhone
    let isAll = req.query.isAll === '1'
    let pageSize = pageCount
    let page = (pageNo - 1) * pageCount
    // let sqlStr = `select * from register limit ${page},${pageSize}`
    let sqlStr = 'select * from register'
    if (registerUser && !isAll) {
      sqlStr += ' WHERE registerUser LIKE ' + mysql.escape('%' + registerUser + '%')
    }
    if (registerSex && !isAll) {
      sqlStr += ' WHERE registerSex LIKE' + mysql.escape('%' + registerSex + '%')
    }
    if (registerPhone && !isAll) {
      sqlStr += ' WHERE registerPhone LIKE' + mysql.escape('%' + registerPhone + '%')
    }
    console.log(sqlStr)
    let data = await getAllData(sqlStr)
    if (page || pageSize && !isAll) {
      sqlStr += ` limit ${page},${pageSize}`
    }
    mysql.query(sqlStr, (err, result) => {
      if (err) {
        console.log(err)
        res.json(new Error('数据获取失败!'))
      } else {
        res.json(new Success({
          data: result,
          page: pageNo,
          size: data.length
        }, '数据获取成功!'))
      }
    })
    // res.json(new Success('registerInfo!'))
  }
)

module.exports = router