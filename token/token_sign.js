const jwt = require('jsonwebtoken');
const fs = require('fs');
const key = 'sdfsdfadfag';

let user ={
    name:'zhang san',
};

let token =jwt.sign(user,key);

console.log(token);

fs.writeFileSync('./token.txt',token_sign);
