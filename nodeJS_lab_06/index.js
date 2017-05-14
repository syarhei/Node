const express = require('express');
const Sequelize = require('sequelize');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errors = require('./utils/errors');
const config = require('./config');

const dbcontext = require('./context/db')(Sequelize, config);

const authorService = require('./services/author')(dbcontext.author, errors, dbcontext.sequelize);
const userService = require('./services/user')(dbcontext.user, dbcontext.role, errors);
const roleService = require('./services/role')(dbcontext.role, errors);
const authService = require('./services/auth')(dbcontext.user, dbcontext.role, errors);
const bookService = require('./services/book')(dbcontext.book,dbcontext.library,dbcontext.author,errors);
const libraryService = require('./services/library')(dbcontext.library,errors);
const cacheService = require('./services/cache');

const apiController = require('./controllers/api')(libraryService, bookService, authorService, userService, roleService,
      authService, cacheService, config);

const logger = require('./utils/logger');
const auth = require('./utils/auth')(authService, config, errors);
const cache = require('./utils/cache')(cacheService);

    const app = express();

app.use(express.static('public'));  // использование статических файлов из папки public
app.use(cookieParser(config.cookie.key));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api', logger);
app.use('/api', auth);
app.use('/api', cache);
app.use('/api', apiController);

dbcontext.sequelize
    .sync()
    .then(() => {
        app.listen(3300, () => console.log('Running on http://localhost:3300'));
    })
    .catch((err) => console.log(err));