const express = require('express');

function BaseController(service, promiseHandler) {
    var self = this;

    this.registerRoutes = registerRoutes;
    this.router = express.Router();
    this.routes = {
        '/': [{ method: 'get', cb: readAll }],
        '/find_one': [{ method: 'get', cb: findOne }],
        '/find_count': [{ method: 'get', cb: findCount }],
        '/count': [{ method: 'get', cb: count }],
        '/min': [{ method: 'get', cb: min }],
        '/max': [{ method: 'get', cb: max }],
        '/query': [{ method: 'get', cb: query_fn }],
        '/:id': [{ method: 'get', cb: read }],
        '/create': [{ method: 'post', cb: create }],
        '/update': [{ method: 'post', cb: update }],
        '/delete': [{ method: 'post', cb: del }]
    };

    function readAll(req, res) {
        promiseHandler(res,
            service.readChunk(req.query)
        );
    }

    function query_fn(req, res) {
        promiseHandler(res,
            service.query_fn(req.query)
        );
    }

    function findOne(req, res) {
        promiseHandler(res,
            service.find_one(req.query)
        );
    }

    function findCount(req, res) {
        promiseHandler(res,
            service.find_count(req.query)
        );
    }

    function count(req, res) {
        promiseHandler(res,
            service.count()
        );
    }

    function min(req, res) {
        promiseHandler(res,
            service.min()
        );
    }

    function max(req, res) {
        promiseHandler(res,
            service.max()
        );
    }

    function read(req, res) {
        promiseHandler(res,
            service.read(req.params.id)
        );
    }

    function create(req, res) {
        promiseHandler(res,
            service.create(req.body)
        );
    }

    function update(req, res) {
        promiseHandler(res,
            service.update(req.body)
        );
    }

    function del(req, res) {
        promiseHandler(res,
            service.delete(req.body.id)
        );
    }

    function registerRoutes() {
        for (var route in self.routes) {
            if (!self.routes.hasOwnProperty(route)) {
                continue;
            }

            var handlers = self.routes[route];

            if (handlers == undefined) continue;

            for (var handler of handlers) {
                self.router[handler.method](route, handler.cb);
            }
        }
    }
}

module.exports = BaseController;