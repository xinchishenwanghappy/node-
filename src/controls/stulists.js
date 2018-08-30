const path = require('path');
const xtpl = require('xtpl');

var ObjectId = require('mongodb').ObjectId;
//const MongoClient = require('mongodb').MongoClient;
//连接数据库
//const url = 'mongodb://localhost:27017';

// exports.stulists = (req, res) => {
//     // res.sendFile(path.join(__dirname, '../statics/views/lists.html'));
//     MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
//         const dbo = db.db('xinchishenwang');
//         dbo.collection('studentInfo').find({}).toArray((err, result) => {
//             db.close();

//             xtpl.renderFile(path.join(__dirname, '../statics/views/lists.html'), {
//                 student: result
//             }, function (error, content) {
//                 res.send(content);
//             });
//         })
//     })
// }

//导入
const studentLis = require(path.join(__dirname, '../tools/mogodb.js'));


//暴露
exports.stulists = (req, res, next) => {
    const keyword = req.query.keyword || '';

    studentLis.findList('studentInfo', { name: { $regex: keyword } }, (err, result) => {
        xtpl.renderFile(path.join(__dirname, '../statics/views/lists.html'), {
            student: result,
            keyword
        }, function (error, content) {
            res.send(content);
        });
        // return next();
    })

    const keyId = req.query.keyId;
    if (keyId) {
        const whereStr = { _id: ObjectId(keyId) }
        studentLis.deleteOne('studentInfo', whereStr, (err, result) => {
            // console.log(result);
           
                // res.send(content);
                console.log("文档删除成功");
            
        })
    }

}