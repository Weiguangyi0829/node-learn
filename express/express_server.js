const express = require('express');

//调用express函数返回一个app代表一个服务器端的应用程序
const app = express();

//express.static方法告诉express框架静态文件在哪
app.use(express.static(__dirname + '/public'));

//对外提供了一个get请求服务 路径是/get_username
app.get('/get_username',function(request,response){
    response.send({
        name:'张三'//json对象
    })
})

app.get('/get_classname',function (req,res) {
    res.send({
        name:'001'
    })
})
app.listen(3030,function(err){
    if (err) {
        console.log(err);
        return;
    }
    console.log('服务已经启动，请访问http://localhost:3030');
    
})