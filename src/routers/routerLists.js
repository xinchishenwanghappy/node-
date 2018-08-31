const path = require('path');
const express = require('express');

//创建路由
const router = express.Router();

//导入
const stulists = require(path.join(__dirname,'../controls/stulists.js'));

//获取学生列表页面
router.get('/lists',stulists.stulists);

//获取新增页面
router.get('/add', stulists.getAddStu);

//完成新增
router.post('/add',stulists.addStu);

//获取编辑页面
router.get('/edit/:studentId', stulists.editStu);


//暴露出去
module.exports = router;
