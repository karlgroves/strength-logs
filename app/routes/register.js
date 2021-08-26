/**
 * POST routing to registration endpoint
 */

const validator = require('validator');
const defaultResponses = require('../lib/defaultResponses.json');
const dbService = require('../lib/dbService');
const dbConn = dbService.db();
const utils = require('../lib/util');
const bcrypt = require('bcrypt');


module.exports = function (app) {

    /**
     * Posts a new request to the register
     */
    app.post('/register/', async (req, res) => {
        let valid = true;

        log.info(new Date(), req.method, req.url, req.body);

        if (typeof req.body !== 'object') {
            defaultResponses.bad_request.info = 'request body is malformed';
            res.status(400).json(defaultResponses.bad_request);
        }
        else {

            //@TODO validate useremail, userpassword, ensure nobody with that same useremail already exists
            //@TODO bCrypt the password
            //@TODO generate UUID as the userID
            //@TODO use the last 12 chars as part of the confirm link: ```str.substring(24, 36)```
            //@TODO send a confirmation email using `npm install nodemailer`


            let sql = 'INSERT INTO users() VALUES()';

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
                        defaultResponses.success.data = data;
                        res.status(200).json(defaultResponses.success);
                    }
                }
            });
        }

    });


    app.get('/confirm/:id', async (req, res) => {
        log.info(new Date(), req.method, req.url, req.body);

        //@TODO validate the `ID`: SELECT * FROM users WHERE SUBSTRING(userID, 25, 12) = ' + req.params.id;

        //@TODO do all the things

        //@TODO send a confirmation email

    });
};
