/**
 * POST routing to registration endpoint
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
     * Posts a new request to the register
     */
    app.post('/register/', async (req, res) => {
        let valid = true;

        log.info(new Date(), req.method, req.url, req.body);

        if (typeof req.body !== 'object') {
            defaultResponses.bad_request.info = 'request body is malformed';
            return res.status(400).json(defaultResponses.bad_request);
        }

        //@TODO validate useremail, userpassword, ensure nobody with that same useremail already exists
        //@TODO bCrypt the password
        //@TODO generate UUID as the userID
        //@TODO use the last 12 chars as part of the confirm link: ```str.substring(24, 36)```
        //@TODO send a confirmation email using `npm install nodemailer`


        const sql = 'INSERT INTO users() VALUES()';

        log.info(sql);


        dbConn.query(sql, (error, results) => {
            handleResponse({ error, results, res });
        });
    });


    app.get('/confirm/:id', async (req, res) => {
        log.info(new Date(), req.method, req.url, req.body);

        //@TODO validate the `ID`: SELECT * FROM users WHERE SUBSTRING(userID, 25, 12) = ' + req.params.id;

        //@TODO do all the things

        //@TODO send a confirmation email

    });
};
