var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Set locals

	// Load the galleries by sortOrder
	view.query('galleries', keystone.list('Gallery').model.sort('-publishedDate').find());
	
	// Render the view
	view.render('gallery');
	
};
