/**
 * Created by Sergei on 04.06.2017.
 */

const express = require('express');

module.exports = (item) => {
    const router = express.Router();

    let itemController = require('./item') (item);

    router.use('/items', itemController);

    return router;
};