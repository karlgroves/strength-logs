/**
 * Status routing. Verifies that the necessary services are working properly
 */

const dbService = require('../lib/dbService');
const dbConn = dbService.db();

module.exports = function (app) {

    app.get('/status/', function (req, res) {
        log.info(new Date(), req.method, req.url);
        log.info(req.params);

        let up = true;

        if (!dbConn || dbConn.state === 'disconnected') {
            log.error('Database error:' + dbConn.state);
            up = false;
        }

        // if any services are down, respond with 500
        if (!up) {
            return res.status(500).json({status: 500});
        }

        return res.status(200).json({status: 200});

    });
};
