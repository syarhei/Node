/**
 * Created by Sergei on 06.06.2017.
 */

let express = require('express');

let app = express();

app.use(express.static('view'));

app.listen(3300, console.log('server starting...'));