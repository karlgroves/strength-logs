/**
 * Status routing
 */

const mysql = require('mysql');
const SqlString = require('sqlstring');
const config = require('../config.json');
const dbService = require('../lib/dbService');
let dbConn = dbService.db();

module.exports = function (app) {

    app.get('/status/', function (req, res) {
        log.info(new Date(), req.method, req.url);
        log.info(req.params);

        let up = true;

        //@TODO check if db is up

        // if any services are down, respond with 500
        if (!up) {
            res.status(500).json({status: 500});
        }
        else {
            res.status(200).json({status: 200});
        }
    });
};
