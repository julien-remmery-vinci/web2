var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { log } = require('console');

var app = express();
let counter = [];
counter[0] = 0;
counter[1] = 0;
counter[2] = 0;
counter[3] = 0;
app.use((req, res, next) => {
    console.log("Requete vers : "+req.method+" "+req.path);
    switch(req.method+" "+req.path){
        case "GET /":
            counter[0]++;
            break;
        case "GET /pizzas":
            counter[1]++;
            break;
        case "POST /pizzas":
            counter[2]++;
            break;
        case "DELETE /pizzas":
            counter[3]++;
            break;
    }
    console.log("Requests counter : ");
    console.log("- GET / : "+counter[0]);
    console.log("- GET /pizzas : "+counter[1]);
    console.log("- POST /pizzas : "+counter[2]);
    console.log("- DELETE /pizzas : "+counter[3]);
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
