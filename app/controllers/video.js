var Video = require('../models/video');

var async = require('async');

exports.index = function (req,res) {
	console.log(req.params.id);
	res.render('video_play',{
		title:'MFT28 by Greg plitt'
	});
};