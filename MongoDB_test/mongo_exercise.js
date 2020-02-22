const { getDB, getDBSync ,getMy } = require('./mongo_database');
// getDB(function callback(db) { //callback函数
//     db.collection('my').find().toArray(function (err, result) {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log(result);

//     });
// });

async function main() {

    try {
        //用 await 和 async 将异步操作变为同步模式
        const db = await getDBSync();

        const my_collection = db.collection('my');

        const my = await getMy(my_collection);

        console.log(my);
    } catch (err) {
        console.log(err);

    }

}

main();



