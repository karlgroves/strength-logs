/**
 * POST routing for traininglogs
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
    app.post('/:userID/traininglogs/', async (req, res) => {
        let valid = true;
        let msg = '';

        log.info(new Date(), req.method, req.url, req.body);
        if (typeof req.body !== 'object') {
            defaultResponses.bad_request.info = 'request body is malformed';
            res.status(400).json(defaultResponses.bad_request);
        }
        else {

            if (validator.isUUID(req.params.userID) === false) {
                valid = false;
                msg += 'Supplied userID is invalid';
            }
            //@TODO validate that the userID exists and the person making the request is that user

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
    });
};
