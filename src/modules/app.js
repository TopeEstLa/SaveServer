const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger')
const config = require('../../ressource/config/config.json')
const connection = require('mysql').createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.mdp,
    database: config.mysql.database
});
connection.connect();

connection.on('error', function(err) {
    logger.log(err.code, 'mysql')
    process.exit()
});

const app = express();

app.get('/list', (req, res) => {
    res.status(201).json({
        message: 'YO'
    });
})

app.use(bodyParser.json());

module.exports = app;