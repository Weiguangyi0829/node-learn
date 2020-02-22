var promise = new Promise(function(resolve,reject){
 resolve('返回一个值')
})

promise.then(function(result){
    console.log(result);
    
})