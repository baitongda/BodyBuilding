/* index page */
exports.index = function(req, res) {
    res.render('index', { 
    	title: 'Index Page',
    	user:req.session.user
     });
}
/* */
