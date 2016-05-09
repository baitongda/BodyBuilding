$(function () {

	var link_img = $('.recommend-list li a img'),
		list = $('.recommend-list');
	list.each(function () {
		var _this = $(this);
		if($(this).children('li').size() <= 4){
			$(this).parents('.recommend').find('.recommend-header-all').hide();
		}else{
			_this.children('li:gt(3)').hide();
			$(this).parents('.recommend').find('.recommend-header-all').text('显示全部').on('click',function () {
				if($(this).text() == '显示全部'){
					$(this).text('收起');
					_this.children('li:gt(3)').show();
				}else{
					$(this).text('显示全部');
					_this.children('li:gt(3)').hide();
				}
			});
		}
	});

});