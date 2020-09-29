/* eslint-disable require-jsdoc */
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
let mysql = require("../config/db");
let {
  Success,
  Error
} = require("../utils/message");

function setToken(rule) {
  return new Promise(resolve => {
    jwt.sign(rule, "secret", {
      expiresIn: 3600
    }, (error, token) => {
      console.log(error);
      resolve(token);
    });
  });
}
router.post("/user", (req, res, next) => {
  let {
    username,
    password
  } = req.body;
  console.log(username, password);
  mysql.query(
    "select * from user where username = ?",
    [username],
    async (error, data) => {
      if (error) {
        throw error;
      }
      let result = data[0];
      if (!result) {
        res.json(new Error("账号不存在!"));
      } else {
        if (password === result.password) {
          let rule = {
            id: result.id,
            username: result.username
          };
          let token = await setToken(rule);
          res.json(new Success({
            username: result.username,
            level: result.level,
            token: "Bearer " + token
          }, "登录成功!"));
        } else {
          res.json(new Error("密码不正确!"));
        }
      }
    }
  );
});
module.exports = router;