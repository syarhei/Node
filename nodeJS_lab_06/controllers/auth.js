const express = require('express');
module.exports = (authService, config ) => {
    const router = express.Router();

    router.post('/login', (req, res) => {
        authService.login(req.body)
            .spread((userId,userRole) => {
                res.cookie(config.cookie.auth, userId, { signed: true });
                res.cookie(config.cookie.roleName,userRole);
                res.redirect("/panel.html");
            })
            .catch((err) => res.error(err));
    });

    router.post('/register', (req, res) => {
        authService.register(req.body)
                .then((user) => {
                    res.cookie(config.cookie.roleName, 'user');
                    res.redirect("/panel.html")
                })
            .catch((err) => res.error(err));
    });
    router.post('/logout', (req, res) => {
        res.cookie(config.cookie.auth, '');
        res.cookie(config.cookie.roleName,'');
        res.redirect("/index.html")
    });

    return router;
};