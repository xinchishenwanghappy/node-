const MongoClient = require('mongodb').MongoClient;
//连接数据库
const url = 'mongodb://localhost:27017';

const dbName = 'xinchishenwang';


// 封装的连接数据库的函数
function connectDB(collectionName, callback) {
    //连接
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {

        //拿到数据操作的对象
        const dbo = db.db(dbName);

        //拿到数据操作的集合
        const collection = dbo.collection(collectionName);

        //将函数外需要用到的参数传递出去
        callback(err, collection, db);
    })
}



//学生列表信息----查询一条或多条
//将findList方法暴露出去
/*
    参数一: 集合名字
    参数二: 查询的条件
    参数三: 回调函数
**/
exports.findList = (collectionName, params, callback) => {

    connectDB(collectionName, (err, collection, db) => {
        collection.find(params).toArray((err, result) => {
            db.close();
            callback(err, result);
        })
    })
    //连接
    // MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    //     const dbo = db.db(dbName);

    //     dbo.collection(collectionName).find(params).toArray((err, result) => {
    //         db.close();
    //         callback(err, result);
    //     })
    // })
}




//登入与注册查询,查询一条数据
exports.findOne = (collectionName, params, callback) => {

    connectDB(collectionName, (err, collection, db) => {
        collection.findOne(params, (err, result) => {
            db.close();
            callback(err, result);
        })
    })
}


//插入一条数据
exports.insertOne = (collectionName, params, callback) => {

    connectDB(collectionName, (err, collection, db) => {
        collection.insertOne(params, (err, result) => {
            db.close();
            callback(err, result);
        })
    })
}

//删除一条数据
exports.deleteOne = (collectionName, params, callback) => {
    // MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {

    //     const dbo = db.db(dbName);

    //     dbo.collection(collectionName).deleteOne(params, (err, result) => {
    //         db.close();
    //         callback(err, result);
    //     })
    // })

    connectDB(collectionName, (err, collection, db) => {
        collection.deleteOne(params, (err, result) => {
            db.close();
            callback(err, result);
        })
    })
}