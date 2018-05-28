var express = require('express');
var app = express();

var CryptoController = require('./crypto/CryptoController');
app.use('/crypto', CryptoController);
var AuthController = require('./auth/AuthController');
app.use('/auth', AuthController);


module.exports = app;
