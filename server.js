const config = require('./config').express;

const express = require('express');

const app = express();

app.get('*', (req, res) => {
    res.send('Hello World I am here !!!!')
})

app.listen(config.port, () => {
    console.log('server listening on ::' + config.port)
})