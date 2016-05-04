var express = require('express');
var router = express.Router();

var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Admin = require('../app/controllers/admin');

/* session */
router.use(function (req,res,next) {
	if(req.session.user){
		//console.log(req.session.user);
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

/* Admin page*/
router.get('/admin',Admin.admin);
router.get('/admin/user',Admin.user);
router.get('/admin/index',Admin.index);
router.get('/admin/hot',Admin.hots);
router.get('/admin/news',Admin.news);

/* count */
/*router.get('/', function(req, res) {
  var page = req.query.p ? parseInt(req.query.p) : 1;
  Posts.count({}, function(err, count) {
    Posts.find({}, null, {skip: (page-1)*3, limit: 3}, function(err, posts) {
      res.render('index', {
        title: '主页',
        user: req.session.user,
        posts: posts,
        page: page,
        isFirstPage: page == 1,
        isLastPage: (page-1)*3 + posts.length == count,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
      });
    });
  });
});*/
module.exports = router;
