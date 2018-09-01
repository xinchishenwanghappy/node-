//导入
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');


//创建服务
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true,  cookie: { maxAge: 6000000 }}));

app.all('/*', (req,res,next) => {
    if(req.url.includes('account')){
        //公共部分放行
        next();
    }else {
        if(req.session.loginName) {
            //登入成功放行
            //  console.log(req.session.loginName);
            next();
        }else {
            res.send("<script>alert('你还没有登入');location.href='/account/login'</script>")
        }
    }
})
//导入集成的路由
const totalRouter = require(path.join(__dirname, './routers/routerControls.js'));
const totalStu = require(path.join(__dirname, './routers/routerLists.js'));

app.use('/account', totalRouter);
app.use('/studentmanager', totalStu);

//开启web服务
app.listen(8899, err => {
    console.log('开启成功');
})


