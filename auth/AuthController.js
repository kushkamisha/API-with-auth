var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var VerifyToken = require('./VerifyToken');
var db = require('../db');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

// Register a user
router.post('/register', function(req, res) {

  req.body.password = bcrypt.hashSync(req.body.password, 8);
  db.none('insert into users("Username", "Email", "Password")' +
    'values(${username}, ${email}, ${password})',
    req.body)
    .then(function() {
      // Create a token
      var hrTime = process.hrtime()
      var timeInMs = hrTime[0] * 1000000 + hrTime[1] / 1000;
      var token = jwt.sign({ iat: timeInMs }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });

      res.status(200).send({ auth: true, token: token });
    })
    .catch(function(err) {
      return res.status(500).send("There was a problem registering the user.");
    });
});

// Login a user
router.post('/login', function(req, res) {

    db.any('select * from users where "Email" = ${email}', req.body)
      .then(function (data) {
        // data is empty
        if (!Object.keys(data).length > 0) return res.status(404).send("No user with such username found.");
        if (Object.keys(data).length > 1) return res.status(500).send("There are more than one user with such email.");

        var passwordValid = bcrypt.compareSync(req.body.password, data[0].Password);
        if (!passwordValid) return res.status(401).send({ auth: false, token: null });

        var hrTime = process.hrtime()
        var timeInMs = hrTime[0] * 1000000 + hrTime[1] / 1000;
        var token = jwt.sign({ iat: timeInMs }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({ auth: true, token: token });
      })
      .catch(function (err) {
        return res.status(500).send("Problem on the server.");
      });
});


module.exports = router;
