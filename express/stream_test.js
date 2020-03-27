const fs =require('fs');

const readStream = fs.createReadStream('./test.txt');

const writeStrem = fs.createWriteStream('./test_copy.txt');


readStream.on('data',function(data){
    console.log(data);
    
    // console.log(data.toString('utf-8'));
    writeStrem.write(data)
    
})

readStream.on('end',function(){
    writeStrem.close();   
})
 
//pipe复制方法
//readStream.pipe(writeStrem);  
