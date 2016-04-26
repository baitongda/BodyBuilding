var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
//var mongoStore = require('connect-mongo')(express);
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./routes/index');
var users = require('./routes/users');
var mongoose = require('mongoose');
//var moment = require('moment');

var app = express();
//传递app给路由

//将moment添加为本地变量, 可以在jade页面中调用
app.locals.moment = require('moment');
// view engine setup
app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
//表单编码
//where the value can be a string or array (when extended is false), or any type (when extended is true).
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//session
app.use(session({
    secret:'sunning',
    cookie:{maxAge: 60*1000},
    resave:true,//每次请求都会重新设置cookie
    //是指无论有没有session cookie，每次请求都设置个session cookie ，默认给个标示为 connect.sid
    saveUninitialized: false
   /* store:new mongoStore{
    url:dbURL,
    collection:'sessions'
    }*/
}));
app.use('/', routes);
//判断环境 (开发,测试,线上)
if ('development' === app.get('env')) { //本地开发环境
    app.set('showStackError', true)  //打印错误信息
    app.use(logger(':method :url :status')) //请求类型 地址 状态码
    app.locals.pretty = true; //格式化源码
    mongoose.set('debug', true);
}
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

console.log("Server is on port 3000!");