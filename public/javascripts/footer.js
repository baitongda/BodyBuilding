$(function() {
    var footer = $('#footer');
    var body = $('body');
    if ($(document.body).height() + 65 < $(document).height()) {
        footer.css({ 'position': 'fixed', 'bottom': '0px' });
    } else {
        footer.css({ 'position': 'absolute', 'bottom': '0px' });
    }
    $(window).resize(function() {
        if ($(document.body).height() + 65 < $(document).height()) {
            footer.css({ 'position': 'fixed', 'bottom': '0px' });
        } else {
            footer.css({ 'position': 'absolute', 'bottom': '0px' });
        }
    });
})
