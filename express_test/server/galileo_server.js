const express = require('express');
const path = require('path');//检查操作系统来确定路径正反斜杠的写法
const bodyParser = require('body-parser');//express里面已经有可以直接用

console.log(__dirname);

const app = express();

app.use(bodyParser.json());//解析转化提交上来的 json 数据，解析为 js 对象
app.use(express.static(path.join(__dirname , '..','public')));

app.get('/get_friends', function (req, res) {
    let friends = [
        { name: '张三' },
        { name: '李四' }
    ]
    res.send(friends);
})

app.post('/register_user',function(req,res){
    req.body;
    console.log(req.body);

    res.send('ok');
    
})

app.listen(4040, function (err) {
    if (err) {
        console.log(err);
        return;

    }
    console.log('http://localhost:4040');

})