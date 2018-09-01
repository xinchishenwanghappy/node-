const path = require('path');
const xtpl = require('xtpl');
var template = require('art-template');

var ObjectId = require('mongodb').ObjectId;

//导入
const studentLis = require(path.join(__dirname, '../tools/mogodb.js'));

//暴露
//学生列表页面
exports.stulists = (req, res) => {
    const keyword = req.query.keyword || '';

    studentLis.findList('studentInfo', { name: { $regex: keyword } }, (err, result) => {
        xtpl.renderFile(path.join(__dirname, '../statics/views/lists.html'), {
            student: result,
            keyword,
            logindName: req.session.loginName
            
        }, function (error, content) {
            res.send(content);
        });
        // var data = {list: result};
        // var html = template(path.join(__dirname, '../statics/views/lists.html'),data));  
        // res.send(html)
    })

    const keyId = req.query.keyId;
    // console.log(keyId);
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
    // console.log(req.session.logindName);
    //假设返回数据
    var data = {
        name:1,
        logindName: req.session.loginName
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


//学生编辑页面
exports.editStu = (req,res) => {
    //根据studentId查询
    studentLis.findOne('studentInfo', {_id:ObjectId(req.params.studentId)}, (err,result) => {
       
        var data = {
            list: result,
            logindName: req.session.loginName
        }
        console.log(data);
        var html = template(path.join(__dirname, '../statics/views/edit.html'),data);  
        res.send(html);
    })
    
}

//根据studentId修改学生信息
exports.changeEditStu = (req,res) => {
    // console.log(req.params.studentId);
    const id = req.params.studentId.split('"')[1];
    // console.log(id);
    studentLis.updateOne('studentInfo',{_id:ObjectId(id)},req.body,(err,result) => {
        if(result) {
            res.send(`<script>window.location.href="/studentmanager/lists"</script>`)
        }else {
            res.send(`<script>alert('修改失败')</script>`)
        }
    })
}


