var express = require('express');
var router = express.Router();

var Index = require('../app/controllers/index');

/* GET home page. */
router.get('/', Index.index);

module.exports = router;
