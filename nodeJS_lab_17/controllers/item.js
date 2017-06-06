/**
 * Created by Sergei on 04.06.2017.
 */

const express = require('express');

module.exports = (service) => {
    const item = express.Router();
    let list = [];
    let isErr = false;

    item.get('/', (req, res) => {
        res.json(list);
    });


    item.post('/', (req, res) => {
        isErr = !isErr;
        if (isErr) {
            return res.status(500).end();
        }

        let item = {
            id: Date.now() + list.length,
            text: req.body.text,
            completed: false
        };
        list.push(item);
        res.status(201).json(item);
    });

    item.put('/', (req, res) => {
        list.forEach(x => {
            if (req.body.completed) x.completed = (req.body.completed == 'true')
        });
        res.json(list);
    });

    item.put('/:id', (req, res) => {
        let index = list.findIndex(x => x.id === +req.params.id);
        if (req.body.text) list[index].text = req.body.text;
        if (req.body.completed) list[index].completed = (req.body.completed == 'true');
        res.json(list[index]);
    });

    item.delete('/completed', (req, res) => {
        list = list.filter(x => !x.completed);
        res.json(list);
    })

    item.delete('/:id', (req, res) => {
        let index = list.findIndex(x => x.id === +req.params.id);
        list.splice(index, 1);
        res.end('Deleted');
    });

    return item;
};