"use strict"
var Promise = require("bluebird");
var bcrypt = require('bcryptjs');
const validate = require('./validate');
const saltRounds = 10;

module.exports = (userRepository, roleRepository, errors) => {
    const permissions = require('../permissions.json');

    return {
        login: login,
        register: register,
        checkPermissions: checkPermissions
    };

    function login(data) {
        return new Promise((resolve, reject) => {
                userRepository.findOne({ where: { email: data.email }, attributes: ['id', 'password'] })
            .then((user) => {
                user.getRoles().then((roles)=>{

                    bcrypt.compare(data.password, user.password, function(err, res) {

                        if(res) resolve([user.id,roles[0].name]);
                        else {
                            reject(errors.wrongCredentials);
                        }
                    });

                });

            })
            .catch(reject);
        });
    }

    function register(data) {
        return new Promise((resolve, reject) => {
            if (!validate.registration(data)) throw (errors.validateUser);
            bcrypt.hash(data.password, saltRounds, function(err, hash) {
                if (err) {
                    throw err;
                }
                var user = {
                    email: data.email,
                    password: hash,
                    firstname: data.firstname,
                    lastname: data.lastname
                };

                Promise.all([
                    userRepository.create(user),
                    roleRepository.findOne({ where: { name: "user" } })
                ])
                    .spread((user, role) => {
                        return user.addRole(role);
                    })
                    .then(() => resolve({ success: true }))
                    .catch(reject);
                console.log(hash);
            });
        });
    }

    function checkPermissions(userId, route) {
        return new Promise((resolve, reject) => {
            if (permissions[route] == undefined) resolve();
            else if (userId == undefined) reject();
            else {
                Promise.all([
                        userRepository.findById(userId),
                        roleRepository.findOne({ where: { name: permissions[route] } })
                    ])
                    .spread((user, role) => {
                        return user.hasRole(role);
                    })
                    .then((has) => {
                        if (has) resolve();
                        else reject();
                    })
                    .catch(reject);
            }
        });
    }
};