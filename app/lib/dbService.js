/**
 * creates a connection to the database
 */

const mysql = require('mysql2');
const SqlString = require('sqlstring');
const config = require('../config.json');

require('./logging')(config);

module.exports = {

    db: function () {

        const connection = mysql.createConnection({
            debug: process.env.DB_DEBUG || false,
            host: process.env.DB_HOSTNAME,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        connection.connect(function (error) {
            if (error) {
                throw new Error('Connection error: ' + error.code + ' ' + error.message);
            }

            log.info('Connected to the MySQL server.');
        });

        return connection;
    }

};
