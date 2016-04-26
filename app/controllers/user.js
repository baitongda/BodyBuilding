var User = require('../models/user');

exports.signup = function (req,res) {
	var _user = req.body.user;
	if(_user.password !== _user.conPassword){
		res.render('error',{message:'两次输入的密码不同!'})
	}else{
		User.findOne({username:_user.name},function (user,err) {
			if(err) return console.log(err);
			if(user){
				return res.end('用户已存在');
			}else{
				var user = new User(_user);
				user.save(function () {
					if (err) return console.log(err);
					req.session.user = user;
                	res.redirect('/');
				});
			}
		});
	}
	
}