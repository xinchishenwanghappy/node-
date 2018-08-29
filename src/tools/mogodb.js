const MongoClient = require('mongodb').MongoClient;
//连接数据库
const url = 'mongodb://localhost:27017';

const dbName = 'xinchishenwang';
//学生列表信息----查询一条或多条
//将findList方法暴露出去
/*
    参数一: 集合名字
    参数二: 查询的条件
    参数三: 回调函数
**/
exports.findList = (collectionName, params, callback) => {

    //连接
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
        const dbo = db.db(dbName);

        dbo.collection(collectionName).find(params).toArray((err, result) => {
            db.close();
            callback(err, result);
        })
    })
}


//登入与注册查询,查询一条数据
exports.findOne = (collectionName, params, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {

        const dbo = db.db(dbName);

        dbo.collection(collectionName).findOne(params, (err, result) => {
            db.close();
            callback(err, result);
        })
    })
}


//插入一条数据
exports.insertOne = (collectionName, params, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {

        const dbo = db.db(dbName);

        dbo.collection(collectionName).insertOne(params, (err, result) => {
            db.close();
            callback(err, result);
        })
    })
}
