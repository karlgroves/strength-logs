/**
 * GET routing for exercise objects
 */

const validator = require('validator');
const defaultResponses = require('../lib/defaultResponses.json');
const SqlString = require('sqlstring');
const dbService = require('../lib/dbService');
const dbConn = dbService.db();
const handleResponse = require('../helpers/handleResponse');

module.exports = function (app) {

    /**
     *  GET request lists all of the user's exercises
     */
    app.get('/:userID/exercises/', function (req, res) {
        log.info(new Date(), req.method, req.url);

        // @TODO validate that the userID exists
        const userExists = util.userExists(req.params.userID);
        log.info(userExists);


        // @TODO validate that the person making the request is that user or an admin

        const sql = `SELECT * FROM exercises WHERE userID=${SqlString.escape(req.params.userID)}`;
        log.info(sql);

        dbConn.query(sql, (error, results) => {
            handleResponse({ error, results, res, onlyErrors: true });

            const data = JSON.stringify(results);
            log.info(data);

            defaultResponses.success.data = results;
            return res.status(200).json(defaultResponses.success);
        });
    });

    /**
     *  Handles both GET and HEAD requests (because express is stupid).
     *  GET request retrieves a record as identified by both the `userID` and `id` parameters
     *  HEAD request determines if the record exists
     */
    app.get('/:userID/exercises/:id', function (req, res) {
        log.info(new Date(), req.method, req.url);
        log.info('Requested ID: ' + req.params.id);

        // @TODO validate that the userID exists
        const userExists = util.userExists(req.params.userID);
        log.info(userExists);


        // @TODO validate that the person making the request is that user or an admin

        // Handle HEAD requests
        if (req.method === 'HEAD') {
            log.info(req.method);

            if (validator.isUUID(req.params.id) === false) {
                return res.status(400).end();
            }

            const sql = 'SELECT exerciseID FROM exercises WHERE userID=' + SqlString.escape(req.params.userID) +
                ' AND exerciseID=' + SqlString.escape(req.params.id) + ' LIMIT 1';

            log.info(sql);

            dbConn.query(sql, (error, results) => {
                if (error) {
                    log.error(error.message);
                    return res.status(500).end();
                }

                log.info(results);
                log.info(typeof results);

                if (!results || !Array.isArray(results) || !results.length) {
                    return res.status(404).end();
                }

                const data = results[0];
                log.info(data);

                defaultResponses.success.data = data;
                return res.status(200).end();
            });
        } else {
            if (validator.isUUID(req.params.id) === false) {
                return res.status(400).json(defaultResponses.bad_request);
            }

            const sql = 'SELECT * FROM exercises WHERE userID=' + SqlString.escape(req.params.userID) +
                ' AND exerciseID=' + SqlString.escape(req.params.id) + ' LIMIT 1';

            log.info(sql);

            dbConn.query(sql, (error, results) => {
                handleResponse({ error, results, res });
            });
        }
    });

};
