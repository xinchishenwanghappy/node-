const path = require('path');
const xtpl = require('xtpl');
var template = require('art-template');


var ObjectId = require('mongodb').ObjectId;

//导入
const studentLis = require(path.join(__dirname, '../tools/mogodb.js'));


//暴露
//学生列表页面
exports.stulists = (req, res, next) => {
    const keyword = req.query.keyword || '';
   
    studentLis.findList('studentInfo', { name: { $regex: keyword } }, (err, result) => {
        xtpl.renderFile(path.join(__dirname, '../statics/views/lists.html'), {
            student: result,
            keyword,
            
        }, function (error, content) {
            res.send(content);
        });
        // return next();
        // var data = {list: result};
        // var html = template(path.join(__dirname, '../statics/views/lists.html'),data));  
        // res.send(html)
    })

    const keyId = req.query.keyId;
    console.log(keyId);
    if (keyId) {
        const whereStr = { _id: ObjectId(keyId) }
        studentLis.deleteOne('studentInfo', whereStr, (err, result) => {
            // console.log(result);
            // res.send(content);
            console.log("文档删除成功");

        })
    }

}

//学生新增页面
exports.getAddStu = (req, res) => {

    //假设返回数据
    var data = {
        name:1
    }
    var html = template(path.join(__dirname, '../statics/views/add.html'),data);  
    res.send(html)
} 


//处理新增----插入一条数据
exports.addStu = (req,res) => {
    studentLis.insertOne('studentInfo', req.body, (err,result) => {
        if(result) {
            res.send(`<script>location.href='/studentmanager/lists'</script>`)
        }else {
            res.send(`<script>alert('新增失败')</script>`);
        }
    })
}