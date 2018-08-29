const path = require('path');

const captchapng = require('captchapng');  //生成验证码图片

//导入查询的函数
const registerReq = require(path.join(__dirname, '../tools/mogodb.js'));
exports.register = (req, res) => {

    //注册成功的状态
    const success = { status: 0, message: '注册成功' };
    console.log(req.body.username);
    registerReq.findOne('accountInfo', { username: req.body.username }, (err, result) => {
        console.log(result);
        if (result) {
            //用户名存在
            //更改状态
            success.status = 1;
            success.message = '用户名已经存在';

            res.json(success);
        } else {
            registerReq.insertOne('accountInfo', req.body, (err, result) => {
                if (result == null) {
                    //插入失败
                    //更改状态
                    success.status = 1;
                    success.message = '注册失败';
                }
                res.json(success);
            })
        }
    })
}

//登入请求
//生成验证码
exports.vcodeImage = (req, res) => {
    const vcode = parseInt(Math.random() * 9000 + 1000)  //随机码

    //将生成的随机码存起来-----与登入的的时候比较
    req.session.vcode = vcode;

    var p = new captchapng(80, 30, vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}

//处理登入页面
exports.login = (req, res) => {
    //登入成功的状态
    const success = { status: 0, message: '登入成功' };
    // console.log(req);
    // console.log(req.body);
    // console.log(req.session);
    if (req.body.vcode != req.session.vcode) {
        success.status = 1;
        success.message = '验证码不正确';

        res.json(success);
        return;
    }

    //验证码正确
    //根据数据库判断

    registerReq.findOne('accountInfo', { username: req.body.username, password: req.body.password }, (err, result) => {
        if (result == null) {
            success.status = 2;
            success.message = "用户名或密码错误";
        }
        res.json(success);
    })

}

//返回登入页面给浏览器
const getLogin = (req, res) => {

    //传送指定路径的文件
    res.sendFile(path.join(__dirname, '../statics/views/login.html'));
}

//返回注册页面给浏览器
const getRegister = (req, res) => {
    res.sendFile(path.join(__dirname, '../statics/views/resgister.html'));
}

// 暴露出去
exports.getLogin = getLogin;
exports.getRegister = getRegister;