// 根据不同的页面给导航条添加不同的样式
$(function () {
	var $form = $('nav.navbar .navbar-form');
	$form.hide();
	var loc = window.location.pathname;
	var $nav = $('nav.navbar ul.nav');

	if(/\/bbs/.exec(loc)){
		$nav.find('.nav_bbs').addClass('active').siblings('li').removeClass('active');
		$form.show();
	}

});