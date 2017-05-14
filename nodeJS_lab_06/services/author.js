"use strict"
module.exports = (authorRepository, errors, sequelize) => {
    const BaseService = require('./base');
    const config = require('../config.json');
    const validate = require('./validate');

    Object.setPrototypeOf(AuthorService.prototype, BaseService.prototype);  // установка прототипа для AuthorService из BaseService

    function AuthorService(authorRepository, errors, sequelize) {
        BaseService.call(this, authorRepository, errors);

        authorRepository.hook('beforeValidate', function(user, options) {
            console.log("beforeValidate");
        });

        authorRepository.afterValidate(function(user, options) {
            console.log("afterValidate");
        })

        this.create = create;
        this.update = update;
        this.delete = del;
        this.readChunk=readChunk;
        this.find_one = find_one;
        this.find_count = find_count;
        this.query_fn = query_fn;

        function readChunk(options) {

            return new Promise((resolve, reject) => {
                options = Object.assign({}, config.defaults.readChunk,config.defaults.search, options);

                let limit = Number(options.limit);
                let offset =Number((options.page - 1) * options.limit);
                let searchKey ='%'+ options.searchKey+'%';

                authorRepository.findAll({
                        limit: limit,
                        offset: offset,
                        order: [[options.orderField, options.order.toUpperCase()]],
                        raw: true,
                    where:{
                        $or:[
                            {
                                name: {
                                    $like: searchKey
                                }
                            }, {
                                country: {
                                    $like: searchKey
                                }
                            },{
                                pseudonym:{
                                    $like: searchKey
                                }
                            },{
                                id:{
                                    $like: searchKey
                                }
                            }

                        ]
                    }
                    }
                ).then(resolve).catch(reject);

            });

        }

        function query_fn(options) {

             if (options.searchKey != undefined)
             var searchKey ='%'+ options.searchKey+'%';
             else var searchKey = '%%';
             console.log('key ' + options.searchKey);
             return sequelize.query('SELECT * FROM authors WHERE name LIKE ?',
             { replacements: [searchKey]  , type: sequelize.QueryTypes.SELECT }
             ).then(function(result) {
             console.log(result);
             return result;
             });

        }

        function find_one(options) {

            authorRepository.findOne({ where: { name: 'serg' } }).then(function(author) {
                author.pseudonym = 'sergei'
                console.log(author.pseudonym) // 'sergei'

                author.reload().then(function() {
                    console.log(author.pseudonym) // 'syarhei'
                })
            });

            return new Promise((resolve, reject) => {
                options = Object.assign({}, config.defaults.readChunk,config.defaults.search, options);

                var limit = Number(options.limit);
                var offset =Number((options.page - 1) * options.limit);
                var searchKey ='%'+ options.searchKey+'%';

                authorRepository.findOne({
                    limit: limit,
                    offset: offset,
                    order: [[options.orderField, options.order.toUpperCase()]],
                    raw: true,
                    where:{
                        name: {
                            $like: searchKey
                        }
                    }
                }).then(resolve).catch(reject);

            });
        }

        function find_count(options) {
            return new Promise((resolve, reject) => {
                options = Object.assign({}, config.defaults.readChunk,config.defaults.search, options);

                var limit = Number(options.limit);
                var offset =Number((options.page - 1) * options.limit);
                var searchKey ='%'+ options.searchKey+'%';

                authorRepository.findAndCountAll({
                    limit: limit,
                    offset: offset,
                    order: [[options.orderField, options.order.toUpperCase()]],
                    raw: true,
                    where:{
                        name: {
                            $like: searchKey,
                            $ne: 'serg'
                        },
                        $and: {
                            id: {
                                $between: [1, 10]
                            },
                            country: {
                                $like: '%bel%'
                            }
                        }
                    }
                }).then(resolve).catch(reject);
            });
        }

        function create(data) {
            return sequelize.transaction((tranc) => {
                return new Promise((resolve, reject) => {
                    if (!validate.author(data)) throw (errors.validateAuthor);
                    var author = {
                        name: data.name,
                        country:data.country,
                        pseudonym:data.pseudonym
                    };
                    this.baseCreate(author)
                        .then(resolve).catch(reject);
                });
            }).then(function (result) {
                console.log("transaction has been committed");
                return result;
            }).catch(function (err) {
                console.log("transaction has been rolled back");
                return errors.transactionError;
            });
        }

        function update(data) {
            return new Promise((resolve, reject) => {
                if (!validate.author(data)) throw (errors.validateAuthor);
                var author = {
                    name: data.name,
                    country:data.country,
                    pseudonym:data.pseudonym
                };

                this.baseUpdate(data.id, author)
                    .then(resolve).catch(reject);
            });
        }

        function del(id) {
            return new Promise((resolve, reject) => {
                this.baseDelete(id)
                    .then(resolve).catch(reject);
            });
        }
        //TODO ADD more functions for author
/*        function upvote(id) {
            return new Promise((resolve, reject) => {
                authorRepository.findById(id)
                    .then((author) => {
                        return author.increment({ rating: 1 })
                    })
                    .then(() => resolve({ success: true }))
                    .catch(reject);
            });
        }

        function downvote(id) {
            return new Promise((resolve, reject) => {
                authorRepository.findById(id)
                    .then((post) => {
                        return post.decrement({ rating: 1 })
                    })
                    .then(() => resolve({ success: true }))
                    .catch(reject);
            });
        }*/
    }

    return new AuthorService(authorRepository, errors, sequelize);
};