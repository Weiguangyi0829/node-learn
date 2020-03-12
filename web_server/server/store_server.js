const express = require('express');

const { getStoreDB } = require('./mongo');

const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('/register', (req, res) => {
    // console.log(req.body.login_name);

    getStoreDB(function (storeDb) {//callback: function(storeDb)
        storeDb.collection('users').insertOne(req.body, function (err, result) {
            if (err) {
                console.log(err);
                res.send({
                    status: 250,
                    msg: err.message
                })
                return;
            }
            res.send({
                status: 100,
                msg: 'ok',
                data: {
                    user_id: result.insertedId
                }
            })
        })
    });
})

app.post('/login', (req, res) => {
    const login_name = req.body.login_name;
    const password = req.body.password;

    getStoreDB(function (storeDb) {//callback: function(storeDb)
        storeDb.collection('users').find({login_name: login_name, password: password}).toArray(function (err, result) {
            if (err) {
                res.send({
                    status: 251,
                    msg: '登录失败'
                })
                return;
            }
            res.send({
                status: 101,
                msg: '登录成功',
                data: {
                    user_id: result.insertedId
                }
            })
        })
    });
})

const port = 3030;
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`http://localhost:${port}`);

})