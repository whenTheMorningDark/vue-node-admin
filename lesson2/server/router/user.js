/* eslint-disable require-jsdoc */
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
let mysql = require('../config/db')
let {
  Success,
  Error
} = require('../utils/message')
router.post('/user', (req, res, next) => {
  let {
    username,
    password
  } = req.body
  console.log(username, password)
  mysql.query(
    'select * from user where username = ?',
    [username],
    async (error, data) => {
      if (error) {
        throw error
      }
      let result = data[0]
      if (!result) {
        res.json(new Error('账号不存在!'))
      } else {
        if (password === result.password) {
          let rule = {
            id: result.id,
            username: result.username,
            password
          }
          const token = jwt.sign(rule, 'kafei', {
            expiresIn: 60 * 60 * 24
          })
          // let token = await setToken(rule)
          res.json(new Success({
            userInfo: {
              username: result.username,
              level: result.level,
            },
            token: 'Bearer ' + token
          }, '登录成功!'))
        } else {
          res.json(new Error('密码不正确!'))
        }
      }
    }
  )
})

router.post('/register', (req, res) => {
  let addSql = 'INSERT INTO register(registerUser,registerSex,registerPhone,registerSchool,registerDate,registerIsWork,registerGood) VALUES(?,?,?,?,?,?,?)'
  let addSqlParams = Object.values(req.body)
  let searchSql = 'select * from register where registerPhone = ?'
  let searchParams = [req.body.phone]
  mysql.query(searchSql, searchParams, (err, result) => {
    if (err) {
      res.json(new Error('添加失败!'))
    }
    if (result.length > 0) {
      res.json(new Error('已经报名,请不要重复报名!'))
    } else {
      mysql.query(addSql, addSqlParams, (err, resut) => {
        if (err) {
          res.json(new Error('添加失败!'))
        }
        if (resut.insertId) {
          res.json(new Success('报名成功!'))
        }
      })
    }
  })
})

module.exports = router