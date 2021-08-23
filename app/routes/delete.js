/**
 * DELETE routing
 */

const defaultResponses = require('../lib/defaultResponses.json');
const SqlString = require('sqlstring');
const dbService = require('../lib/dbService');
const dbConn = dbService.db();
const utils = require('../lib/util');

module.exports = function (app) {

    /**
     * Deletes a record from the DB based on the supplied item type and ID
     */
    app.delete('/:thing/:id', function (req, res) {
        log.info(new Date(), req.method, req.url);

        let idField = getPKName(req.params.thing);

        let sql = 'DELETE FROM ' + SqlString.escape(req.params.thing) + ' WHERE ' + SqlString.escape(idField) + '=' + SqlString.escape(req.params.id);

        log.info(sql);

        dbConn.query(sql, (error, results, fields) => {
            if (error) {
                defaultResponses.internal_server_error.code = error.code;
                defaultResponses.internal_server_error.info = error.message;
                res.status(500).json(defaultResponses.internal_server_error);
            }
            else {
                log.info('Deleted Row(s):', results.affectedRows);

                if (results.affectedRows === 0) {
                    res.status(404).json(defaultResponses.not_found);
                }
                else {
                    defaultResponses.success.info = 'Record was successfully deleted';
                    res.status(200).json(defaultResponses.success);
                }
            }
        });
    });

    /**
     * Returns a 400 because a "thing" wasn't provided
     */
    app.delete('*', function (req, res) {
        log.info(new Date(), req.method, req.url);
        log.info(req.params);
        defaultResponses.bad_request.info = 'Invalid Route Supplied for DELETE request';
        res.status(400).json(defaultResponses.bad_request);
    });

};
