const jwt = require('jsonwebtoken');
const fs = require('fs');
const key = 'sdfsdfadfag';

let user = {
    name: 'zhang san',
};

let token_sign = jwt.sign(user, key,{expiresIn: 10});

console.log(token_sign);


fs.writeFileSync('./token.txt', token_sign);
