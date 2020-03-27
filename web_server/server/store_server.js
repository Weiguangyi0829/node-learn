const express = require('express');
const cookieParser = require('cookie-parser');
const { tokenVerify } = require('./token_valid/token_verify')
const path = require('path');
const bodyParser = require('body-parser');



const app = express();

//中间件

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));



app.use(tokenVerify);

//路由
const userRouter = require('./routes/user_router');
const productRouter = require('./routes/product_router');
app.use('/user', userRouter);
app.use('/product', productRouter);



//-------------------------//



const port = 3030;
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`http://localhost:${port}`);

})

//--inspect-brk