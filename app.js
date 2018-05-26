var express = require('express');
var app = express();

var CryptoController = require('./crypto/CryptoController');
app.use('/users', CryptoController);
var AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);


module.exports = app;
