/**
 * POST routing
 */

const validator = require('validator');

const defaultResponses = require('../lib/defaultResponses.json');
const dbService = require('../lib/dbService');
let dbConn = dbService.db();
const utils = require('../lib/util');

module.exports = function (app) {

    /**
     * Posts a new request
     */
    app.post('/:thing/', async (req, res) => {
        let valid = true;
        let msg = '';

        log.info(new Date(), req.method, req.url, req.body);
        if (typeof req.body !== 'object') {
            defaultResponses.bad_request.info = 'request body is malformed';
            res.status(400).json(defaultResponses.bad_request);
        }
        else {
            if (req.params.thing === 'users') {
                if (validator.isEmail(req.body.userEmail) === false) {
                    valid = false;
                    msg += 'Supplied email is invalid';
                }
                if (validator.isEmpty(req.body.userPassword)) {
                    valid = false;
                    msg += 'Supplied email is invalid';
                }
            }
            if (req.params.thing === 'exercises') {
                if (validator.isEmpty(req.body.exerciseName)) {
                    valid = false;
                    msg += 'Supplied exercise name is invalid';
                }
            }

            if (req.params.thing === 'traininglogs') {
                if (validator.isUUID(req.body.userID) === false) {
                    valid = false;
                    msg += 'Supplied userID is invalid';
                }

                if (validator.isUUID(req.body.exerciseID) === false) {
                    valid = false;
                    msg += 'Supplied exerciseID is invalid';
                }

                // sets
                if (validator.isNumeric(req.body.sets) === false) {
                    valid = false;
                    msg += 'Sets must be a number';
                }

                // reps
                if (validator.isNumeric(req.body.reps) === false) {
                    valid = false;
                    msg += 'Reps must be a number';
                }

                // weight
                if (validator.isNumeric(req.body.weight) === false) {
                    valid = false;
                    msg += 'Weight must be a number';
                }
            }
        }
    });

    /**
     * Requires a "thing" for all posts
     */
    app.post('*', async (req, res) => {
        log.info(new Date(), req.method, req.url, req.body);
        defaultResponses.bad_request.info = 'Invalid Route Supplied for POST request';
        res.status(400).json(defaultResponses.bad_request);
    });
};
