/**
 * Sets up logging
 */

const pkg = require('../../package.json');
const bunyan = require('bunyan');
const fs = require('fs');
const path = require('path');

module.exports = function (config) {
    const streams = [{
        stream: process.stdout
    }];

    if (config.logFile) {
        const logFile = path.join(__dirname, '../', config.logFile);

        if (!fs.existsSync(path.dirname(logFile))) {
            fs.mkdirSync(path.dirname(logFile));
        }

        streams.push({
            type: 'rotating-file',
            path: logFile,
            period: '1d'
        });
    }

    global.log = bunyan.createLogger({
        name: pkg.name,
        streams: streams,
        src: true
    });
};
