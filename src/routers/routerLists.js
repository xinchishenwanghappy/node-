const path = require('path');
const express = require('express');

//创建路由
const router = express.Router();

//导入
const stulists = require(path.join(__dirname,'../controls/stulists.js'));

router.get('/lists',stulists.stulists);

//暴露出去
module.exports = router;
