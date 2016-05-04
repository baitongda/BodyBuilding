$(function() {
    // nav 
    $('.header-nav li.header-dropdown').addClass('active');

    var edit = $('.admin-user-edit'),
        add = $('#add-hot'),
        header = $('.modal-header span.header-title'),
        title = $('#hot-title'),
        url = $('#hot-url'),
        date = $('#hot-date'),
        inputs = $('.form-group').find('input'),
        select = $('#hot-admin');

    // edit btn
    edit
        .on('click', function() {
            var parent = $(this).parents('tr'),
                hot_id = parent.data('id'),
                hot_title = parent.children('.hot-title').text(),
                hot_url = parent.children('.hot-url').text(),
                hot_user = parent.children('.hot-user').text(),
                hot_date = parent.children('.hot-date').text();
            console.log(hot_id);
            header.text('编辑热点');
            title.val(hot_title);
            url.val(hot_url);
            date.val(hot_date);
            select.val(hot_user);
        });
    // add btn
    add
        .on('click', function() {
            inputs.val('');
            header.text('添加热点');
        });
});
