var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var VerifyToken = require('../auth/VerifyToken');
var Crypto = require('./Crypto');
var db = require('../db');


// Check that only users with token can use the function.
// !!! REMOVE FUNCTION WHEN DEPLOY !!!
router.get('/', VerifyToken, function (req, res, next) {

    db.any('select * from users')
    .then(function (data) {
      res.status(200).send(data);
    })
    .catch(function (err) {
      return res.status(500).send("There was a problem with retriaving data.");
    });
});

// router.post('/encrypt', VerifyToken, function(req, res, next) {
//
//   var string = req.body.string;
//   var encrypted = Cryptography.encrypt(string);
//   res.status(200).send(encrypted);
// });
//
// router.post('/decrypt', VerifyToken, function(req, res, next) {
//
//   var encrypted = req.body.encrypted;
//   var decrypted = Cryptography.decrypt(encrypted);
//   res.status(200).send(decrypted);
// })


module.exports = router;
