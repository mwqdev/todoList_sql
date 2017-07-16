const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const postgres = require('pg');
const sequelize = require('sequelize');

const port = parseInt(process.env.PORT) || '3000';

const index = require('./routes/index');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended:false}));

app.use('/', index);

app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

app.listen(port, () => {
	console.log('Listening on ' + port);
});
