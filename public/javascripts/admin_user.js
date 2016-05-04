
$(function() {
    //nav
    $('.header-nav a[href="/admin/user"]').parent('li').addClass('active');
    //
    var edit = $('.admin-user-edit'),
        add = $('#add-user'),
        header = $('.modal-header span.header-title'),
        name = $('#username'),
        password = $('#password'),
        phone = $('#phone'),
        _root = $('#root'),
        inputs = $('.form-group').find('input');

    // edit btn
    edit
        .on('click', function() {
            var parent = $(this).parents('tr'),
                user_id = parent.data('id'),
                user_name = parent.children('.user-name').text(),
                user_root = parent.children('.user-root').text(),
                user_phone = parent.children('.user-phone').text();
            header.text('编辑用户');
            name.val(user_name);
            password.parents('.form-group').hide();
            phone.val(user_phone);
            _root.val(user_root);

        });
    // add btn
    add
        .on('click', function() {
            header.text('添加用户');
            inputs.val('');
            password.parents('.form-group').show();
        });
});

