/**
 * GET routing
 */

const validator = require('validator');
const defaultResponses = require('../lib/defaultResponses.json');
const mysql = require('mysql');
const SqlString = require('sqlstring');
const config = require('../config.json');
const dbService = require('../lib/dbService');
let dbConn = dbService.db();
const utils = require('../lib/util');

module.exports = function (app) {

    /**
     *  GET request just lists records
     */
    app.get('/:thing/', function (req, res) {
        log.info(new Date(), req.method, req.url);

        let sql = 'SELECT * FROM ' + req.params.thing;
        log.info(sql);

        dbConn.query(sql, (error, results, fields) => {
            if (error) {
                log.error(error);
                defaultResponses.internal_server_error.info = error;
                res.status(500).json(defaultResponses.internal_server_error);
            }
            else {

                log.info(results);
                log.info(typeof results);

                let data = JSON.stringify(results);
                log.info(data);

                if (typeof results !== 'object') {
                    res.status(404).json(defaultResponses.not_found);
                }
                else if (results) {
                    defaultResponses.success.data = results;
                    res.status(200).json(defaultResponses.success);
                }
            }
        });
    });


    /**
     *  Handles both GET and HEAD requests (because express is stupid).
     *  GET request retrieves a record as identified by the `id` parameter
     *  HEAD request determines if the record exists
     */
    app.get('/:thing/:id', function (req, res) {
        log.info(new Date(), req.method, req.url);
        log.info('Requested ID: ' + req.params.id);

        let idField = utils.getPKName(req.params.thing);

        if (req.method === 'HEAD') {
            log.info(req.method);

            if (validator.isUUID(req.params.id) === false) {
                res.status(400).end();
            }
            else {
                let sql = 'SELECT ' + idField + ' FROM ' + req.params.thing + ' WHERE ' + idField + '=' + SqlString.escape(req.params.id) + ' LIMIT 1';
                log.info(sql);

                dbConn.query(sql, (error, results, fields) => {
                    if (error) {
                        log.error(error.message);
                        res.status(500).end();
                    }
                    else {
                        log.info(results);
                        log.info(typeof results);

                        let data = results[0];
                        log.info(data);

                        if (typeof results !== 'object') {
                            res.status(404).end();
                        }
                        else if (results) {
                            defaultResponses.success.data = data;
                            res.status(200).end();
                        }
                    }
                });
            }
        }

        else {

            if (validator.isUUID(req.params.id) === false) {
                res.status(400).json(defaultResponses.bad_request);
            }
            else {
                let sql = 'SELECT * FROM ' + req.params.thing + ' WHERE ' + idField + '="' + req.params.id + '" LIMIT 1';
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

                        if (typeof results !== 'object') {
                            res.status(404).json(defaultResponses.not_found);
                        }
                        else if (results) {
                            defaultResponses.success.data = data;
                            res.status(200).json(defaultResponses.success);
                        }
                    }
                });
            }
        }
    });

    /**
     * Requires a "thing" for all posts
     */
    app.get('*', async (req, res) => {
        log.info(new Date(), req.method, req.url, req.body);
        defaultResponses.bad_request.info = 'Invalid Route Supplied for GET request';
        res.status(400).json(defaultResponses.bad_request);
    });
};
