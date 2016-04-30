var express = require('express');
var router = express.Router();

var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');

/* session */
router.use(function (req,res,next) {
	if(req.session.user){
		console.log(req.session.user);
	}
	next();
});

/* GET home page. */
router.get('/', Index.index);
router.get('/index', Index.index);

/* User */
router.post('/signin',User.signin);
router.post('/signup',User.signup);
router.get('/logout',User.logout);



module.exports = router;
