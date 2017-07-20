const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const bunyan = require('bunyan');
var Raven = require('raven');

const app = express();
const logger = bunyan.createLogger({
    name: 'nodeApp'
});

Raven.config(process.env.SENTRY_DSN).install();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());
app.use(cors());

app.use(Raven.requestHandler());

app.get('/', (req, res) => {
    return res.status(200).json({
        status: 'running'
    });
});

app.route('/feeds')
    .get((req, res) => {
        logger.info('/feeds called...');
        return res.status(200).json({
            data: '/feeds called'
        });
    })
    .post((req, res) => {
        const name = req.query.name;
        if (!name) return res.status(400).json({
            data: 'Bad Request'
        });
        return res.status(200).json({
            data: 'hello ' + name
        });
    });

app.get('/error', (req, res) => {
    throw new Error('Borke!');
});

app.use(Raven.errorHandler());
app.use((err, req, res, next) => {
    return res.status(500).send('500 Internal Server Error...');
});

app.use((req, res, next) => {
    return res.status(404).send('404 Not Found...');
});

module.exports = app;