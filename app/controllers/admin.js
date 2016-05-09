

exports.admin = function (req,res) {
	res.render('admin',{
		title:'后台管理-首页'
	});
};
exports.user = function (req,res) {
	res.render('admin_user',{
		title:'后台管理-用户管理'
	});
};
exports.index = function (req,res) {
	res.render('admin_index',{
		title:'后台管理-首页管理'
	});
};
exports.hots = function (req,res) {
	res.render('admin_hot',{
		title:'后台管理-热点管理'
	});
};
exports.news = function (req,res) {
	res.render('admin_news',{
		title:'后台管理-新闻管理'
	});
};
exports.video = function (req,res) {
	res.render('admin_video',{
		title:'后台管理-视频管理'
	});
};