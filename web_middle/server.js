const express = require('express');

const app = express();

app.get('/get_user', function (req, res) {
    res.send({
        name: 'William'
    })
});


const port = 3040;
app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`http://localhost:${port}`);
});