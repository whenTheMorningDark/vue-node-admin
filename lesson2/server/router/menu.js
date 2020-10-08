const express = require('express')
const router = express.Router()
let {
  Success
} = require('../utils/message')
let data = [{
  name: 'addStudent',
  path: '/Student/addStudent',
  title: '添加学生',
  id: 2,
  pId: 1
}, {
  name: 'delStudent',
  path: '/Student/delStudent',
  title: '删除学生',
  id: 3,
  pId: 1
}]
router.get('/menu', (req, res) => {
  res.json(new Success({
    data
  }, '菜单获取成功!'))
})
module.exports = router