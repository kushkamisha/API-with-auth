require('dotenv').load();
var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = process.env.PG_CONNECT || 'postgres://localhost:5432/crypto';
var db = pgp(connectionString);


module.exports = db;
