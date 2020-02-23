var promise = new Promise(function (resolve, reject) {
    resolve('返回一个值');
});


let arr = ['hello', 'boy']
let arr2 = ['good']
let arr3 = [...arr, ...arr2];
async function main() {
    const result = await promise;
    console.log(result);

}
main();


// promise.then(function(result){
//     console.log(result);

// }).catch(function(err){
//     console.log(err);

// }).finally(function(){
//     console.log('请求结束 ');

// })