/* index page */
var testNews = [{
    title: '健美走向大众 重庆兴起全民健身',
    url: 'http://www.muscles.com.cn/news/20140802/22659.shtml'
}, {
    title: '世界健美先生彼尚太原签售新书',
    url: 'http://www.muscles.com.cn/news/20140729/20337.shtml'
}, {
    title: '2014全国健美锦标赛（江苏连云港）',
    url: 'http://www.muscles.com.cn/news/20140722/5927.shtml'
}, {
    title: '健美走向大众 重庆兴起全民健身',
    url: 'http://www.muscles.com.cn/news/20140802/22659.shtml'
}, {
    title: '世界健美先生彼尚太原签售新书',
    url: 'http://www.muscles.com.cn/news/20140729/20337.shtml'
}];



exports.index = function(req, res) {
    res.render('index', {
        title: 'Index Page',
        user: req.session.user,
        news: testNews
    });
};
/* */
