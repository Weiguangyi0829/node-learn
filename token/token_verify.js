const jwt = require('jsonwebtoken');
const fs = require('fs');
const key = 'sdfsdfadfag';

const token = fs.readFileSync('./token.txt', 'utf-8');

const obj = jwt.verify(token, key);
console.log(obj);
