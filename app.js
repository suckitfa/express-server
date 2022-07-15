var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 引入校验客户端
var checkAPP = require('./utils/middleware')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 静态服务器
app.use(express.static(path.join(__dirname, 'public')));
// 使用中间件,本项目中所有自定义路由都是用该中间件
app.use('/',checkAPP ,indexRouter);
app.use('/users', usersRouter);

module.exports = app;
