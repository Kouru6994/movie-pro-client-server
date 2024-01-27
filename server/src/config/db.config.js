const mysql = require('mysql');
const { logger } = require('../utils/logger');
const { DB_HOST, DB_USER, DB_NAME, DB_PASS } = require('../utils/secret');

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME
});

connection.connect((err) => {
    if (err) logger.error(err.message);
    else logger.info('Database connected')
});

module.exports = connection;