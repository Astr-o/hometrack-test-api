const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const config = require('./config').express;
const propertyProcessor = require('./internal_modules/property-processor');

const app = express();

app.use(bodyParser.json());
app.use(morgan('combined'));

app.post('/', (req, res, next) => {
    try {
        const reqPayload = req.body.payload;

        const resPayload = propertyProcessor
            .filterHtvCompleteProperties(reqPayload)
            .map(prop => {
                return {
                    concataddress: propertyProcessor.concatAddress(prop.address),
                    type: prop.type,
                    workflow: prop.workflow
                };
            });

        res.send({ response: resPayload });

    } catch (err) {
        next(err);
    }
});

// 404 - handler
app.use('*', (req, res) => {
    res.status(404).send({ error: 'Resource not found' });
});

// default error handler
app.use((err, req, res, next) => {
    console.error(err.message);
    console.info(err.stack);

    // handle body parser parse error 
    if (err.type === 'entity.parse.failed') {
        res.status(400).send({ error: 'Could not decode request: JSON parsing failed' });
    } else {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.listen(config.port, () => {
    console.log('server listening on ::' + config.port);
});