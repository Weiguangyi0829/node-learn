const jwt = require('jsonwebtoken');
const key = 'asdfsdghaeerhadf';

const whitelist = [
    '/user/login',
    '/user/register'
]

function tokenVerify(req, res, next) {
    if (whitelist.indexOf(req.url) !== -1) {
        next();
    } else {
        jwt.verify(req.cookies.token, key, function (err, loginObj) {
            console.log(req.url);

            if (err) {
                res.send({
                    status: 10005,
                    msg: 'token失效'
                });
                return;
            }

            next();
        })
    }

}

module.exports = {
    tokenVerify
};