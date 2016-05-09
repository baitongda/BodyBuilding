$(function() {
    //nav
    $('.header-nav a[href="/admin/video"]').parent('li').addClass('active');

    var edit = $('.admin-user-edit'),
        add = $('#add-video'),
        header = $('.modal-header span.header-title'),
        name = $('#video-name'),
        url = $('#video-url'),
        length = $('#video-length'),
        summary = $('#video-summary'),
        date = $('#video-date'),
        admin = $('#video-admin'),
        inputs = $('.form-group').find('input');

    // edit btn
    edit
        .on('click', function() {
            var parent = $(this).parents('tr'),
                video_id = parent.data('id'),
                video_name = parent.children('.video-name').text(),
                video_url = parent.children('.video-url').text(),
                video_date = parent.children('.video-date').text(),
                video_length = parent.children('.video-length').text(),
                video_summary = parent.children('.video-summary').text(),
                video_user = parent.children('.video-user').text();
            console.log(video_id);
            header.text('编辑视频');
            name.val(video_name);
            url.val(video_url);
            date.val(video_date);
            length.val(video_length);
            summary.val(video_summary);
            admin.val(video_user);
        });
    // add btn
    add
        .on('click', function() {
            header.text('添加视频');
            inputs.val('');
        });
});
