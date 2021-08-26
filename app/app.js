/**
 *  Main app file
 */

require('dotenv').config({silent: true, path: process.cwd() + '/.env'});

const pkg = require('../package.json');
const config = require('./config.json');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');

require('./lib/logging')(config);

const app = express();

app.set('port', process.env.PORT);
app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/favicon.ico', function (req, res) {
    res.status(204);
    res.end();
});

// Include the routes file(s)
require('./routes')(app);



const server = app.listen(app.get('port'), function (err, res) {
    let host = server.address().address;
    let port = server.address().port;

    if(err){
        log.error('-----');
        log.error('Error starting app!');
        log.error(err);
        log.error('-----');
    }

    log.info('%s listening at http://%s:%s', pkg.name, host, port);
});

module.exports = server;
