const express = require('express');

express.response.error = function(error) {
    if (!error.code) {
        error = {
            message: error.toString(),
            code: 'server_error',
            status: 500
        };
    }

    this.status(error.status).json(error);

    // TODO: log erorr + 'res.locals.trace'
};

module.exports = {
    invalidId: {
        message: 'Invalid id',
        code: 'invalid_id',
        status: 400
    },
    notFound: {
        message: 'Entity not found',
        code: 'entity_not_found',
        status: 404
    },
    wrongCredentials: {
        message: 'Email or password are wrong',
        code: 'wrong_credentials',
        status: 404
    },
    accessDenied: {
        message: 'Access denied',
        code: 'access_denied',
        status: 403
    },
    validateBook: {
        message: 'Not validate in book',
        code: 'validate',
        status: 441
    },
    validateAuthor: {
        message: 'Not validate in author',
        code: 'validate',
        status: 442
    },
    validateLibrary: {
        message: 'Not validate in library',
        code: 'validate',
        status: 443
    },
    validateUser: {
        message: 'Not validate in registration',
        code: 'validate',
        status: 444
    },
    transactionError: {
        message: 'transaction has been rolled back',
        code: 'transaction',
        status: 444
    }
};