/**
 * Login/ Logout routing
 */

const validator = require('validator');
const defaultResponses = require('../lib/defaultResponses.json');
const dbService = require('../lib/dbService');
const dbConn = dbService.db();
const utils = require('../lib/util');
const bcrypt = require('bcrypt');
const handleResponse = require('../helpers/handleResponse');

module.exports = function (app) {

    /**
     * Posts a new request to the login
     */
    app.post('/login/', async (req, res) => {
        let valid = true;

        log.info(new Date(), req.method, req.url, req.body);
        if (typeof req.body !== 'object') {
            defaultResponses.bad_request.info = 'request body is malformed';
            return res.status(400).json(defaultResponses.bad_request);
        }

        //@TODO encrypt the password: ``` req.body.userPassword ``` using https://www.npmjs.com/package/bcrypt

        const sql = 'SELECT userID FROM users WHERE userEmail=' + +SqlString.escape(req.body.userEmail) + ' AND userPassword=' + passwordEncrypted + ' LIMIT 1';

        log.info(sql);

        dbConn.query(sql, (error, results) => {
            handleResponse({
                error,
                results,
                res,
                onlyErrors: true,
                successCb: () => {
                    //@TODO set bearer token using https://www.npmjs.com/package/express-bearer-token
                    let data = results[0];
                    log.info(data);

                    defaultResponses.success.data = data;
                    return res.status(200).json(defaultResponses.success);
                },
            });
        });
    });

    /**
     * Logs out the user
     */
    app.get('/logout/', async (req, res) => {
        log.info(new Date(), req.method, req.url, req.body);

        //@TODO destroy the token and do whatever is needed to consider the user "logged out"

    });
};
