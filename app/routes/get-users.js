/**
 * GET routing for users
 */

const validator = require('validator');
const defaultResponses = require('../lib/defaultResponses.json');
const SqlString = require('sqlstring');
const dbService = require('../lib/dbService');
const dbConn = dbService.db();
const utils = require('../lib/util');
const handleResponse = require('../helpers/handleResponse');

module.exports = function (app) {

    /**
     *  GET request just lists records
     */
    app.get('/users/', function (req, res) {
        log.info(new Date(), req.method, req.url);

        // @TODO only admin users can access this route

        const sql = 'SELECT * FROM users';
        log.info(sql);

        dbConn.query(sql, (error, results) => {
            handleResponse({ error, res, results });
        });
    });

    /**
     *  Handles both GET and HEAD requests (because express is stupid).
     *  GET request retrieves a record as identified by both the `userID` and `id` parameters
     *  HEAD request determines if the record exists
     */
    app.get('/users/:id', async function (req, res) {
        log.info(new Date(), req.method, req.url);
        log.info('Requested ID: ' + req.params.id);

        // @TODO validate that the userID exists
        const userExists = await utils.userExists(req.params.id);

        console.log('-----');
        console.log('USER EXISTS');
        console.log('-----');

        console.log(userExists);

        log.info(typeof userExists);

        // @TODO only admin users can access this route *unless* the requester is viewing their own record

        // Handle HEAD requests
        if (req.method === 'HEAD') {
            log.info(req.method);

            if (validator.isUUID(req.params.id) === false) {
                return res.status(400).end();
            }

            const sql = 'SELECT * FROM users WHERE userID=' + SqlString.escape(req.params.id) + ' LIMIT 1';
            log.info(sql);

            dbConn.query(sql, (error, results) => {
                handleResponse({ error, res, results });
            });
        } else {
            if (validator.isUUID(req.params.id) === false) {
                return res.status(400).json(defaultResponses.bad_request);
            }

            // @TODO only admin users can access this route

            const sql = 'SELECT * FROM users WHERE userID="' + req.params.id + '" LIMIT 1';
            log.info(sql);

            dbConn.query(sql, (error, results) => {
               handleResponse({error, res, results });
            });
        }
    });
};
