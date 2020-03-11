const express = require('express');

const { getStoreDB } = require('./mongo');

const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('/register', (req, res) => {
    console.log(req.body.login_name);

    getStoreDB(function(storeDb){//callback: function(storeDb)
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

const port = 3030;
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`http://localhost:${port}`);

})