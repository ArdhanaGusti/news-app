var express = require('express');
var app = express();

var router = require('./routes/routes');

//both index.js and things.js should be in same directory
app.use('/', router);

app.listen(3000);