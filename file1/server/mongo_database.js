const mongodb = require('mongodb');
const MC = mongodb.MongoClient;
const dbUrl = 'mongodb://localhost:27017';


// function getDB(callback) { //callback函数
//     MC.connect(dbUrl, function (err, client) {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log('连接成功');

//         const myDB = client.db('wgy');
//         callback(myDB);
//     })
// }

function getDBSync() {
    return new Promise(function (resove, reject) {
        MC.connect(dbUrl, function (err, client) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            console.log('连接成功');

            const myDB = client.db('wgy');
            resove(myDB);
            
        })
    })
}
function getMy(my_collection) {
    return new Promise(function (resove, reject) {
        my_collection.find({}).toArray(function (err, result) {
            if (err) {
                reject(err);
                return;
            }
            resove(result);
        });
    })

}

module.exports = {
    // getDB,
    getDBSync,
    getMy
}