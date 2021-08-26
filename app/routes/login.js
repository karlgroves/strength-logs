/**
 * Login/ Logout routing
 */

const validator = require('validator');
const defaultResponses = require('../lib/defaultResponses.json');
const dbService = require('../lib/dbService');
const dbConn = dbService.db();
const utils = require('../lib/util');
const bcrypt = require('bcrypt');

module.exports = function (app) {

    /**
     * Posts a new request to the login
     */
    app.post('/login/', async (req, res) => {
        let valid = true;

        log.info(new Date(), req.method, req.url, req.body);
        if (typeof req.body !== 'object') {
            defaultResponses.bad_request.info = 'request body is malformed';
            res.status(400).json(defaultResponses.bad_request);
        }
        else {

            //@TODO encrypt the password: ``` req.body.userPassword ``` using https://www.npmjs.com/package/bcrypt

            let sql = 'SELECT userID FROM users WHERE userEmail=' + +SqlString.escape(req.body.userEmail) + ' AND userPassword=' + passwordEncrypted + ' LIMIT 1';

            log.info(sql);

            dbConn.query(sql, (error, results, fields) => {
                if (error) {
                    log.error(error.message);
                    res.status(500).json(defaultResponses.internal_server_error);
                }
                else {

                    log.info(results);
                    log.info(typeof results);

                    let data = results[0];
                    log.info(data);

                    if (typeof results !== 'object' || results.length === 0) {
                        res.status(404).json(defaultResponses.login_not_found);
                    }
                    else if (results) {

                        //@TODO set bearer token using https://www.npmjs.com/package/express-bearer-token

                        defaultResponses.success.data = data;
                        res.status(200).json(defaultResponses.success);
                    }
                }
            });
        }
    });

    /**
     * Logs out the user
     */
    app.get('/logout/', async (req, res) => {
        log.info(new Date(), req.method, req.url, req.body);

        //@TODO destroy the token

    });
};
