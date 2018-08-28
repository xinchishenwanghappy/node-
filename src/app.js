//导入
const express = require('express');
const path = require('path');

//创建服务
const app = express();

//导入集成的路由
const totalRouter = require(path.join(__dirname, './routers/routerControls.js'));

app.use(totalRouter);

//开启web服务
app.listen(8899, err => {
    console.log('开启成功');
})