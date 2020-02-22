const { getDB,getDBSync } = require('./mongo_database');
getDB(function callback(db) { //callback函数
    db.collection('my').find().toArray(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);

    });
});

async function main(){
    
    const db = await getDBSync();

    const my_collection = db.collection('my');

    const my = await getMy(my_collection);

    console.log(my);
    
}

main();




// MC.connect(dbUrl, function (err, client) {
//     if (err) {
//         console.log(err);
//         return;
//     }

//     const wgyDB = client.db('wgy');
//     wgyDB.collection('my').update({ id: '01' }, { $set: { student: '张飞' } }, function (err, result) {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log(result);

//     });
//     client.close();
// })


