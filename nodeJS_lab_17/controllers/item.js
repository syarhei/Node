/**
 * Created by Sergei on 04.06.2017.
 */

const express = require('express');

module.exports = (service) => {
    const item = express.Router();

    item.get('/', (req, res) => {
        let options = req.query;
        service.getItems(options).then((array) => {
            res.json({ message: array });
        }).catch((error) => {res.json({ error: error })});
    });


    item.post('/', (req, res) => {
        let object = req.body;
        service.addItem(object).then((object) => {
            res.json({ message: object });
        }).catch((error) => {res.json({ error: error })});
    });

    item.delete('/:id', (req, res) => {
        let options = req.params;
        service.deleteItem(options).then((object) => {
            res.json({ message: object });
        }).catch((error) => {res.json({ error: error })});
    });

    return item;
};