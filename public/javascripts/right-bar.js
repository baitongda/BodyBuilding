// Javascript document

$(function() {
    var bar = $('.right-bar-body'),
        ulList = bar.children('ul'),
        lis = ulList.children('li'),
        NUM = 5,
        during = 3000,
        direction = 'top';
    showNews(bar, ulList, lis, NUM, during, direction);

    function showNews(parent, ulList, list, num, time, dir) {
        var newList = list.clone(),
            index = 0;
        ulList.css({ 'position': 'absolute', 'top': '0' });
        newList.appendTo(ulList);
        var timer = null;
        timer = setInterval(letGo, during);

        ulList.children('li').mouseenter(function() {
            $(this).find('a').css('color', '#ffb400');
            clearTimeout(timer);
        }).mouseleave(function() {
            $(this).find('a').css('color', '#333');
            timer = setInterval(letGo, during);
        });
        function letGo() {
            if (index <= 4) {
                ulList.animate({ top: -30 * (index + 1) + 'px' }, 'slow');
                index++;
                if (index === 5) {
                    ulList.animate({ 'top': '0' }, 0);
                    index = 0;
                }
            }
        }
    }
});
