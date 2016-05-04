var mongoose = require('mongoose');

var HotSchema = require('../schemas/hot');
var Hot = mongoose.model('Hot',HotSchema);

module.exports = Hot;