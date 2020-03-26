const express = require('express');
const mongodb = require('mongodb');

const cookieParser = require('cookie-parser');


const jwt = require('jsonwebtoken');
const key = 'asdfsdghaeerhadf'

const ObjectId = mongodb.ObjectId;

const { getStoreDB } = require('./mongo');

const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, '..', 'public')));

const whitelist = [
    '/login'
]

app.use(function (req, res, next) {
    if (whitelist.indexOf(req.url) !== -1) {
        next();
    } else {
        jwt.verify(req.cookies.token, key, function (err, loginObj) {
            console.log(req.url);
            
            if (err) {
                res.send({
                    status: 10005,
                    msg: 'token失效'
                });
                return;
            }

            next();
        })
    }

});

app.post('/register', (req, res) => {
    // console.log(req.body.login_name);

    getStoreDB(function (storeDb) {//callback: function(storeDb)
        storeDb.collection('users').insertOne(req.body, function (err, result) {
            if (err) {
                console.log(err);
                res.send({
                    status: 10001,
                    msg: err.message
                })
                return;
            }
            res.send({
                status: 100,
                msg: 'ok',
                data: {
                    user_id: res.insertedId
                }
            })
        })
    });
})

app.post('/login', (req, res) => {
    const lgn = req.body.login_name;
    const psw = req.body.password;

    getStoreDB(function (storeDb) {//callback: function(storeDb)
        storeDb.collection('users').find({ login_name: lgn, password: psw }).toArray(function (err, result) {
            if (err) {
                res.send({
                    status: 10002,
                    msg: '数据库连接错误'
                })
                return;
            }
            if (result.length !== 0) {
                const token = jwt.sign({
                    login_name: lgn

                }, key);
                res.cookie('token', token);//(name,参数)
                res.send({
                    status: 100,
                    msg: '登录成功',
                })
            } else {
                res.send({
                    status: 10003,
                    msg: '登录失败'
                })
            }
        })
    });
})

app.get('/get_products', function (req, res) {


    getStoreDB(function (storeDb) {
        storeDb.collection('products').find({}).toArray(function (err, result) {
            if (err) {
                res.send({
                    status: 10002,
                    msg: '数据库连接错误'
                });
                return;
            }
            res.send({
                status: 100,
                msg: 'ok',
                data: {
                    products: result
                }
            })
        })
    })

});

app.post('/add_products', function (req, res) {
    getStoreDB(function (storeDb) {
        storeDb.collection('products').insertOne(req.body, function (err, result) {
            if (err) {
                res.send({
                    status: 10002,
                    msg: '数据库连接错误'
                });
                return;
            }

            res.send({
                status: 100,
                msg: 'ok',
                data: {
                    products: result
                }
            })
        })
    })
})

app.post('/del_products', function (req, res) {
    getStoreDB(function (storeDb) {
        storeDb.collection('products').remove({ _id: ObjectId(req.body._id) }, function (err, result) {
            if (err) {
                res.send({
                    status: 10002,
                    msg: '数据库连接错误'
                });
                return;
            }
            if (result.result.n === 1) {
                res.send({
                    status: 100,
                    msg: 'ok',
                })
            } else {
                res.send({
                    status: 10004,
                    msg: '删除失败'
                })
            }

        })
    })
})

const port = 3030;
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`http://localhost:${port}`);

})

//--inspect-brk