var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { log } = require('console');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let counter = {};
app.use((req, res, next) => {
    console.log("Requete vers : "+req.method+" "+req.path);

    let request = req.method+" "+req.path;
    console.log(counter);
    if(counter[request] == undefined){
        counter[request] = 1;
    }else{
        counter[request]++;
    }

    console.log("Requests counter : ");
    for(let key in counter){
        console.log("- "+key+ " : "+counter[key]);
    }
    next();
})

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
