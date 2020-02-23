const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'..','public')));

app.post('/register',function(req,res){
    console.log(req.body.login_name);
    
    // console.log(req.body.password);
    res.send('ok')
    
})

const port = 3030;
app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log(`http://localhost:${port}`);
    
})