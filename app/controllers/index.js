/* index page */
var Hot = require('../models/hot');
var New = require('../models/new');
var async = require('async');

var testHot = [{
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

var testNews = [{
    user: 'Sun.',
    date: '2016-5-1',
    fork: 12,
    fav: 12,
    image: '/images/news-1.jpg',
    title: '腰窝与性感无关？',
    content: '腰窝是什么？腰窝是背部后面，臀部上方的脊柱两侧的两个略微凹下去的窝的，看起来特像小酒窝；美术界又称“圣涡”，是理想的人体模特的标志之一，特别是臀模，如果有腰窝那更是无数摄影师争抢的对象，其价值不言而愈，臀模有腰窝和没有腰窝的区别是非常大的；',
    url: 'http://www.fitnes.cn/jianshen/3177.html'
}, {
    user: 'Sun.',
    date: '2016-5-1',
    fork: 12,
    fav: 12,
    image: '/images/news-1.jpg',
    title: '腰窝与性感无关？',
    content: '腰窝是什么？腰窝是背部后面，臀部上方的脊柱两侧的两个略微凹下去的窝的，看起来特像小酒窝；美术界又称“圣涡”，是理想的人体模特的标志之一，特别是臀模，如果有腰窝那更是无数摄影师争抢的对象，其价值不言而愈，臀模有腰窝和没有腰窝的区别是非常大的；',
    url: 'http://www.fitnes.cn/jianshen/3177.html'
}, {
    user: 'Sun.',
    date: '2016-5-1',
    fork: 12,
    fav: 12,
    image: '/images/news-1.jpg',
    title: '腰窝与性感无关？',
    content: '腰窝是什么？腰窝是背部后面，臀部上方的脊柱两侧的两个略微凹下去的窝的，看起来特像小酒窝；美术界又称“圣涡”，是理想的人体模特的标志之一，特别是臀模，如果有腰窝那更是无数摄影师争抢的对象，其价值不言而愈，臀模有腰窝和没有腰窝的区别是非常大的；',
    url: 'http://www.fitnes.cn/jianshen/3177.html'
}, {
    user: 'Sun.',
    date: '2016-5-1',
    fork: 12,
    fav: 12,
    image: '/images/news-1.jpg',
    title: '腰窝与性感无关？',
    content: '腰窝是什么？腰窝是背部后面，臀部上方的脊柱两侧的两个略微凹下去的窝的，看起来特像小酒窝；美术界又称“圣涡”，是理想的人体模特的标志之一，特别是臀模，如果有腰窝那更是无数摄影师争抢的对象，其价值不言而愈，臀模有腰窝和没有腰窝的区别是非常大的；',
    url: 'http://www.fitnes.cn/jianshen/3177.html'
}];


exports.index = function(req, res) {
    // 并行执行多个函数, 传给结果数组的顺序为任务顺序, 而非任务完成先后的先后的顺序
    async.parallel({
        hots: function(cb) {
            Hot.find({}).limit(5).exec(function(err, doc) {
                cb(err, doc);
            });
        },
        news: function(cb) {
            New.find({}).limit(4).exec(function(err, doc) {
                cb(err, doc);
            });
        }
    }, function(err, results) {
        if (err) return console.log(err);
        res.render('index', {
            title: 'BodyBuilding -- 可能是最受欢迎的健身网站',
            user: req.session.user,
            hots: results.hots,
            news: results.news
        });
    });

};
