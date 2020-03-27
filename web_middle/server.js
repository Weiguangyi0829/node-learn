const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    console.log('111');
    next();

});
// app.use(bodyParser.json());

//实现body-parser
app.use(function (req, res, next) {
    console.log(req.method);
    if (req.method === 'POST') {
        let body = '';
        req.on('data', function (data) {
            body += data;
        })

        req.on('end', function () {
            const bodyObj = JSON.parse(body);
            console.log('(use)', body);//JSON对象
            console.log(bodyObj.name);

            req.body = bodyObj;
            next();
        })

    } else {
        next();
    }

})
app.post('/add_user', function (req, res) {
    console.log('(post / add_user)', req.body);//js对象

})




app.get('/get_user', function (req, res) {
    // console.log(req.url);

    res.send({
        name: 'William'
    })
});


const port = 3040;
app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`http://localhost:${port}`);
});