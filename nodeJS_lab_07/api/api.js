/**
 * Created by Sergei on 08.02.2017.
 */

function api(app, passport) {
    app.get('/auth/twitter',
        passport.authenticate('twitter'));

    app.get('/auth/twitter/callback',
        passport.authenticate(
            'twitter',
            { failureRedirect: '/login' }
        ), (req, res) => {
            res.redirect('/');
        });

    app.get('/', function (req, res) {
        if (req.user) {
            res.send('Hello @' + req.user.username + '!');
        } else {
            res.send('Hello stranger!');
        }
    });
}

exports.api = api;