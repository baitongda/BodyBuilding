$(function() {
    //nav
    $('.header-nav li.header-dropdown').addClass('active');

    var edit = $('.admin-user-edit'),
        add = $('#add-news'),
        header = $('.modal-header span.header-title'),
        title = $('#news-title'),
        url = $('#news-url'),
        date = $('#news-date'),
        image = $('#news-image'),
        fork = $('#news-fork'),
        fav = $('#news-fav'),
        content = $('#news-content'),
        admin = $('#news-admin'),
        inputs = $('.form-group').find('input'),
        textarea = $('.form-group').find('textarea');

    // edit btn
    edit
        .on('click', function() {
            var parent = $(this).parents('tr'),
                news_id = parent.data('id'),
                news_title = parent.children('.news-title').text(),
                news_url = parent.children('.news-url').text(),
                news_date = parent.children('.news-date').text(),
                news_image = parent.children('.news-image').text(),
                news_fork = parent.children('.news-fork').text(),
                news_fav = parent.children('.news-fav').text(),
                news_content = parent.children('.news-content').text(),
                news_user = parent.children('.news-user').text();
            console.log(news_title);
            header.text('编辑新闻');
            title.val(news_title);
            url.val(news_url);
            date.val(news_date);
            image.val(news_image);
            fork.val(news_fork);
            fav.val(news_fav);
            content.val(news_content);
            admin.val(news_user);
        });
    // add btn
    add
        .on('click', function() {
            header.text('添加新闻');
            inputs.val('');
            content.val('');
        });
});
