const express = require('express');
const productRouter = express.Router();
const mongodb = require('mongodb');

const { getStoreDB } = require('../mongo');

const ObjectId = mongodb.ObjectId;



productRouter.get('/get_products', function (req, res) {
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

productRouter.post('/add_products', function (req, res) {
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

productRouter.post('/del_products', function (req, res) {
    getStoreDB(function (storeDb) {
        storeDb.collection('products').deleteOne({ _id: ObjectId(req.body._id) }, function (err, result) {
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

module.exports = productRouter