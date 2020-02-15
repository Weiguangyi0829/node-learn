const https = require('https');
const fs = require('fs');

const cheerio = require('cheerio')

https.get('https://www.baidu.com',function(response){
    let html = ''
    response.on('data',function(data){
        html = html + data;
    })
    response.on('end',function(){
        // console.log(html);
        fs.writeFileSync('./utils/baidu.html',html);//文件路径和数据保存
    })
    response.on('end',function(){
        const $ = cheerio.load(html);//类似jQuery加载页面
        
        let links = $('a');
        
        console.log(links.length);//网页链接数
        for(let i = 0; i<links.length; i++){
            console.log($(links[i]).text(),links[i].attribs.href);
            
        }
        
    })
})