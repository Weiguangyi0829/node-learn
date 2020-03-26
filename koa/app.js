const koa = require('koa');
const Router = require('koa-router');


//实例化koa

const app = new koa();
const router = new Router();

//路由
router.get('/',async(ctx)=>{
    ctx.body = {msg:'hello'};
});




//配置路由

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 5000;

app.listenerCount(port,()=>{
    console.log(`localhost:${port}`);
    
})