const defaultResponses = require('../lib/defaultResponses.json');

const handleResponse = ({ error, res, results, successCb }) => {
    if (error) {
        log.error(error.message);
        return res.status(500).json(defaultResponses.internal_server_error);
    }

    log.info(results);
    log.info(typeof results);

    if (!results || !Array.isArray(results) || !results.length) {
        return res.status(404).json(defaultResponses.not_found);
    }

    if (successCb) {
        return successCb();
    }

    const data = results[0];
    log.info(data);

    defaultResponses.success.data = data;
    return res.status(200).json(defaultResponses.success);
};

module.exports = handleResponse;
