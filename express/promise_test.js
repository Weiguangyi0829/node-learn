const promise = new Promise(function(resolve,reject){
    // resolve('ok')
    setTimeout(() => {
        resolve('三秒后执行这个')
    }, 3000);
});
promise.then(function(data){
    console.log(data);//调用resolve
    
}).catch(function(error){
    console.log('错误',error);//调用reject
    
})

const fs = require('fs');

async function readFileTest(){
    return new Promise(function(resolve,reject){
        fs.readFile('./test111.txt','utf-8',function(err,data){
            if(err){
                reject(err);
                return;
            }
            resolve(data);
        })
    });
}
async function main(){
    let fileContent = await readFileTest();//拿到结果
    console.log(fileContent);
    
}
main();

