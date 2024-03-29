const mysql = require('mysql');
const { logger } = require('../utils/logger');
const { DB_HOST, DB_USER, DB_PASS } = require('../utils/secret');

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS
});

console.log("cek con: ",connection)

connection.connect((err) => {
    if (err) logger.error(err.message);
});

module.exports = connection;