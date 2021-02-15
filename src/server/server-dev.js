// import path from 'path'
import fs from "fs"
import express from 'express'
import https from 'https'
import http from 'http'

const bodyParser = require('body-parser');

const privateKey  = fs.readFileSync('certs/key.pem', 'utf8');
const certificate = fs.readFileSync('certs/cert.pem', 'utf8');

const credentials = {key: privateKey, cert: certificate};

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

import ip from './ip'
app.get('/ip', function(req, res, next) {
    res.send({ip:ip()});
})

import routes from './route'
app.get('/api/getrsa', routes.getRSA)
app.post('/api/setrsa', routes.setRSA)

app.get('/api/connect', routes.connect)

app.use(express.static('dist/public'))

const PORT = process.env.PORT || 9999
const PORTSSL = process.env.PORTSSL || 443

let httpServer = http.createServer(app);
let httpsServer = https.createServer(credentials, app);

httpServer.listen(9999, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
});

httpsServer.listen(PORTSSL, () => {
        console.log(`And listening to ${PORTSSL}....`)
        console.log('Press Ctrl+C to quit.')
    });