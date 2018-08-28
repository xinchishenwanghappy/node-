const path = require('path');



const MongoClient = require('mongodb').MongoClient;
//连接数据库
const url = 'mongodb://localhost:27017/xinchishenwang';

//注册请求
exports.register = (req, res) => {
    //注册成功的状态
    const success = { status: 0, message: '注册成功' };

    //注册---首先需要到数据库查询用户名有没有----不存在就插入-----存在就不插入,并且提示用户
    MongoClient.connect(url,{ useNewUrlParser: true }, function (err, db) {
        // if (err) throw err;
        const dbo = db.db("xinchishenwang");

        dbo.collection("studentInfo").findOne({ username: req.body.username }, (err, result) => {
            // if (err) throw err;
            if (result) {
                //用户名存在
                db.close();  //关闭连接

                //更改状态
                success.status = 1;
                success.message = '用户名已经存在';

                res.json(success);
            } else {
                //用户名不存在
                //插入数据
                dbo.collection("studentInfo").insertOne(req.body, (err, resOne) => {
                    db.close();  //关闭连接

                    if (resOne == null) {
                        //插入失败
                        //更改状态
                        success.status = 1;
                        success.message = '注册失败';
                    }

                    res.json(success);
                })
            }

        })
    });
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