const path = require('path');

//返回登入页面给浏览器
const getLogin = (req,res) => {
    
    //传送指定路径的文件
    res.sendFile(path.join(__dirname,'../statics/views/login.html'));
}

//返回注册页面给浏览器
const getResgister = (req,res) => {
    res.sendFile(path.join(__dirname,'../statics/views/resgister.html'));
}

// 暴露出去

exports.getLogin = getLogin;
exports.getResgister = getResgister;