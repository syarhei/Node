/**
 * Created by Sergei on 05.06.2017.
 */

const sequelize = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.json');

let app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use('/webpack', express.static('webpack'));
app.use(express.static('view'));

const db_connect = require('./database/connect') (sequelize);

let itemService = require('./services/item') (db_connect.item);

let api = require('./controllers/api') (itemService);

app.use('/api', api);

db_connect.sequelize.sync().then(
    () => {
        app.listen(process.env.PORT || 3300, () => {
            console.log("Server start");
        })
    }).catch((error) => {console.log(error)});

module.exports = app;