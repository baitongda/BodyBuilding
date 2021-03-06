var User = require('../models/user');
var url = require('url');

exports.signin = function(req, res) {
    var oriUlr = req.headers['referer'] ? req.headers['referer'] : '/';
    var rPath = url.parse(oriUlr).pathname;
    var _user = req.body.user;
    User.findOne({ name: _user.name }, function(err, user) {
        if (err) return console.log(err);
        if (!user) return res.render('error', {
            message: '用户不存在!',
            error: {
                status: '500',
                stack: 'retry!'
            }
        });
        user.comparePassword(_user.password, function(err, isMarch) {
            if (err) return console.log(err);
            if (isMarch) {
                req.session.user = _user;
                res.redirect(rPath);
            } else {
                res.render('error', {
                    message: '密码错误',
                    error: {
                        status: '500',
                        stack: 'retry!'
                    }
                });
            }
        });
    });

};

exports.signup = function(req, res) {
    var _user = req.body.user;
    if (_user.password !== _user.conPassword) {
        res.render('error', { message: '两次输入的密码不同!' });
    } else {
        User.findOne({ username: _user.name }, function(err, user) {
            if (err) return console.log(err);
            if (user) {
                return res.end('用户已存在');
            } else {
                var user = new User(_user);
                user.save(function(err) {
                    if (err) return console.log(err);
                    req.session.user = user;
                    res.redirect('/');
                });
            }
        });
    }

};

exports.logout = function(req, res) {
    var oriUlr = req.headers['referer'] ? req.headers['referer'] : '/';
    var rPath = url.parse(oriUlr).pathname;
    delete req.session.user;
    res.redirect(rPath);
};
