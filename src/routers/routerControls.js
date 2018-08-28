const express = require('express');
const path = require('path');

//创建路由
const router = express.Router();

//导入自定义模块
const accountRouter = require(path.join(__dirname, '../controls/handlepage.js'));

//判断登入与注册页面,同时返回给浏览器
router.get('/login', accountRouter.getLogin);
router.get('/register', accountRouter.getRegister);

//处理注册请求
router.post('/register',accountRouter.register);

//暴露出去
module.exports = router;

