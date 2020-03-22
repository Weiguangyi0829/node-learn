const jwt = require('jsonwebtoken');
const fs = require('fs');
const key = 'sdfsdfadfag';

let user = {
    name: 'zhang san',
};

let token = jwt.sign(user, key);

console.log(token);
const obj = jwt.verify(tokey,key);
console.log(obj);

fs.writeFileSync('./token.txt', token_sign);
