const express = require('express');
const userRouter = express.Router();
const { getStoreDB } = require('../mongo');
const jwt = require('jsonwebtoken');
const key = 'asdfsdghaeerhadf'

userRouter.post('/register', (req, res) => {
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

userRouter.post('/login', (req, res) => {
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

module.exports = userRouter