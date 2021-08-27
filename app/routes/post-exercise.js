/**
 * POST routing for exercises
 */

const validator = require('validator');

const defaultResponses = require('../lib/defaultResponses.json');
const dbService = require('../lib/dbService');
const dbConn = dbService.db();
const utils = require('../lib/util');

module.exports = function (app) {

    /**
     * Posts a new exercise
     */
    app.post('/:userID/exercises/', async (req, res) => {
        let valid = true;
        let msg = '';

        log.info(new Date(), req.method, req.url, req.body);

        if (typeof req.body !== 'object') {
            defaultResponses.bad_request.info = 'request body is malformed';
            return res.status(400).json(defaultResponses.bad_request);
        }

        // @TODO validate that the userID exists

        // @TODO validate that the person making the request is that user or an admin


        if (validator.isEmpty(req.body.exerciseName)) {
            valid = false;
            msg += 'Supplied exercise name is invalid';
        }

        //@TODO validate that the user hasn't already used this exact exerciseName

        // INSERT INTO exercises()VALUES();
    });
};
