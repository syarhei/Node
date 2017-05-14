module.exports = BaseService;

function BaseService(repository, errors) {
    const config = require('../config.json');
    const defaults = {
        readChunk: {
            limit: 10,
            page: 1,
            order: 'asc',
            orderField: 'id'
        },
        search:{
            searchKey:""
        }
    };

    var self = this;

    this.readChunk = readChunk;
    this.read = read;
    this.baseCreate = baseCreate;
    this.baseUpdate = baseUpdate;
    this.baseDelete = del;
    this.find_one = find_one;
    this.find_count = find_count;
    this.count = count;
    this.min = min;
    this.max = max;
    this.query_fn = query_fn;

    function readChunk(options) {
        return new Promise((resolve, reject) => {
            options = Object.assign({}, defaults.readChunk, options);

            var limit = Number(options.limit);
            var offset =Number((options.page - 1) * options.limit);

            repository.findAll({
                    limit: limit,
                    offset: offset,
                    order: [[options.orderField, options.order.toUpperCase()]],
                    raw: true,

                }
            ).then(resolve).catch(reject);

        });
    }

    function query_fn(options) {
        return Promise.resolve('put api/authors/query');
    }

    function search(options) {
        return new Promise((resolve,reject)=>{
            options = Object.assign({}, defaults.search, options);
            var searchKey = options.searchKey;
            repository.findAll({

            })
              .then(resolve).catch(reject);
        })
    }

    function read(id) {
        return new Promise((resolve, reject) => {
            id = parseInt(id);

            if (isNaN(id)) {
                reject(errors.invalidId);
                return;
            }

            repository.findById(id, { raw: true })
                .then((post) => {
                    if (post == null) reject(errors.notFound);
                    else resolve(post);
                })
                .catch(reject);
        });
    }

    function baseCreate(data) {
        return new Promise((resolve, reject) => {
            repository.create(data)
                .then(resolve).catch(reject);
        });
    }

    function find_one(options) {
        return new Promise((resolve, reject) => {
            options = Object.assign({}, config.defaults.readChunk,config.defaults.search, options);

            var limit = Number(options.limit);
            var offset =Number((options.page - 1) * options.limit);
            var searchKey ='%'+ options.searchKey+'%';

            repository.findOne({
                    limit: limit,
                    offset: offset,
                    order: [[options.orderField, options.order.toUpperCase()]],
                    raw: true
                }
            ).then(resolve).catch(reject);
        });
    }
    
    function find_count(options) {
        return new Promise((resolve, reject) => {
            options = Object.assign({}, config.defaults.readChunk,config.defaults.search, options);

            var limit = Number(options.limit);
            var offset =Number((options.page - 1) * options.limit);
            var searchKey ='%'+ options.searchKey+'%';

            repository.findAndCountAll({
                    limit: limit,
                    offset: offset,
                    order: [[options.orderField, options.order.toUpperCase()]],
                    raw: true
                }
            ).then(resolve).catch(reject);
        });
    }

    function count() {
        return new Promise((resolve, reject) => {
            repository.count().then(resolve).catch(reject);
        });
    }

    function min() {
        return new Promise((resolve, reject) => {
            repository.min('id').then(resolve).catch(reject);
        });
    }

    function max() {
        return new Promise((resolve, reject) => {
            repository.max('id').then(resolve).catch(reject);
        });
    }

    function baseUpdate(id, data) {
        return new Promise((resolve, reject) => {
            repository.update(data, { where: { id: id }, limit: 1 })
                .then(resolve).catch(reject);
        });
    }

    function del(id) {
        return new Promise((resolve, reject) => {
            repository.destroy({ where: { id: id } })
                .then(() => resolve({ success: true }))
                .catch(reject);
        });
    }
}