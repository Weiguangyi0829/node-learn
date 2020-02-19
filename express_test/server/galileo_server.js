const express = require('express');
const path = require('path');//检查操作系统来确定路径正反斜杠的写法

console.log(__dirname);

const app = express();

app.use(express.static(path.join(__dirname + /../public)));

app.get('/get_friends', function (req, res) {
    let friends = [
        { name: '张三' },
        { name: '李四' }
    ]
    res.send(friends);
})
app.get('/get_friends2', function (req, res) {
    let friends = [
        { name: '李白' },
        { name: '哪吒' }
    ]
    res.send(friends);
})

aoo.post('/register_user',function(req,res){

})

app.listen(4040, function (err) {
    if (err) {
        console.log(err);
        return;

    }
    console.log('http://localhost:4040');

})