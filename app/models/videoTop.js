var mongoose = require('mongoose');

var VideoTopSchema = require('../schemas/videoTop');
var VideoTop = mongoose.model('VideoTop',VideoTopSchema);

module.exports = VideoTop;