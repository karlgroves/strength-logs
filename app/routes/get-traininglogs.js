/**
 * GET routing for training logs
 */

const validator = require('validator');
const defaultResponses = require('../lib/defaultResponses.json');
const SqlString = require('sqlstring');
const dbService = require('../lib/dbService');
const handleResponse = require('../helpers/handleResponse');
const util = require('../lib/util');
const dbConn = dbService.db();

module.exports = function (app) {

    /**
     *  GET request just lists records
     */
    app.get('/:userID/traininglogs/', async function (req, res) {
        log.info(new Date(), req.method, req.url);

        // @TODO validate that the userID exists
        const userExists = await util.userExists(req.params.userID);
        log.info(userExists);

        //
        //
        //
        // and the person making the request is that user


        const sql = 'SELECT ' +
            'traininglogs.*, exercises.exerciseName ' +
            'FROM ' +
            'traininglogs, exercises ' +
            'WHERE ' +
            'traininglogs.exerciseID=exercises.exerciseID ' +
            'AND ' +
            'traininglogID="' + req.params.id + '" ';

        log.info(sql);

        dbConn.query(sql, (error, results) => {
            handleResponse({ error, results, res });
        });
    });


    /**
     *  Handles both GET and HEAD requests (because express is stupid).
     *  GET request retrieves a record as identified by both the `userID` and `id` parameters
     *  HEAD request determines if the record exists
     */
    app.get('/:userID/traininglogs/:id', function (req, res) {
        log.info(new Date(), req.method, req.url);
        log.info('Requested ID: ' + req.params.id);

        //@TODO validate that the userID exists and the person making the request is that user

        // Handle HEAD requests
        if (req.method === 'HEAD') {
            log.info(req.method);

            if (validator.isUUID(req.params.id) === false) {
                return res.status(400).end();
            }

            const sql = `SELECT traininglogID FROM traininglogs WHERE traininglogID=${SqlString.escape(req.params.id)} LIMIT 1`;
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
            // gotta use an ID in the request and the ID must be a UUID/GUID
            if (validator.isUUID(req.params.id) === false) {
                return res.status(400).json(defaultResponses.bad_request);
            }

            const sql = 'SELECT ' +
                'traininglogs.*, exercises.exerciseName ' +
                'FROM ' +
                'traininglogs, exercises ' +
                'WHERE ' +
                'traininglogs.exerciseID=exercises.exerciseID ' +
                'AND ' +
                'traininglogID="' + req.params.id + '" ' +
                'LIMIT 1';

            log.info(sql);

            dbConn.query(sql, (error, results) => {
                handleResponse({ error, results, res });
            });
        }
    });
};
