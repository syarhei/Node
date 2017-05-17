/**
 * Created by Sergei on 07.02.2017.
 */

delete process.env["DEBUG_FD"];

const sequelize =require("sequelize");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const twitter = require("passport-twitter");
const config = require("./config.json");

let db = require("./database/connect");
let user = require("./model/user");
let api = require("./api/api");
let connect = db.connect(config, sequelize);
let user_model = user.user(connect, sequelize);

let app = express();

passport.use(new twitter({
        consumerKey: config.twitter.key,
        consumerSecret: config.twitter.secret,
        callbackURL: config.twitter.callback
    },
    (token, tokenSecret, profile, cb) => {
        user_model.findOrCreate({
                where: { twitterId: profile.id }
            });
        cb(null, profile);
    }
));

// для того чтобы сохранять и доставать пользовательские данные из сессии.
passport.serializeUser(
    (user, done) => done(null, user)
);

passport.deserializeUser(
    (user, done) => done(null, user)
);

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'keyboard cat'
}));

app.use(passport.initialize());
app.use(passport.session());

api.api(app, passport);

connect.sync({ force: true }).then(
    function () {
        app.listen(3300, () => {
            console.log("Hello World!!!");
        });
    }
)