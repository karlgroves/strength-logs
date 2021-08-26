const defaultResponses = require('../lib/defaultResponses.json');

const handleResponse = ({ error, res, results, onlyErrors }) => {
    if (error) {
        log.error(error.message);
        return res.status(500).json(defaultResponses.internal_server_error);
    }

    log.info(results);
    log.info(typeof results);

    if (!results || !Array.isArray(results) || !results.length) {
        return res.status(404).json(defaultResponses.login_not_found);
    }

    if (!onlyErrors) {
        const data = results[0];
        log.info(data);

        defaultResponses.success.data = data;
        return res.status(200).json(defaultResponses.success);
    }
}

module.exports = handleResponse;
