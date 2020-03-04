const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { getDBSync, getMy } = require('./mongo_database');

const app = express();

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('/register', (req, res) => {
    console.log(req.body.login_name);

    console.log(req.body.password);
    res.send('ok')

})

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


const port = 4040;
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`http://localhost:${port}`);

})