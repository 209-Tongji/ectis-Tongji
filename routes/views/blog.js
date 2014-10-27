var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Init locals
	locals.filters = {
		category: req.params.category
	};
	locals.data = {
		posts: [],
		categories: []
	};
	
	// Load all categories
	view.on('init', function(next) {
		
		keystone.list('PostCategory').model.find().sort('-priority').exec(function(err, results) {
			
			if (err || !results.length) {
				return next(err);
			}
			
			locals.data.categories = results;
			
			// Load the counts for each category
			async.each(locals.data.categories, function(category, next) {
                if(category.type==='文档分类')
                {
                    keystone.list('Post').model.count().where('category').in([category.id]).exec(function(err, count) {
                        category.postCount = count;
                        next(err);
                    });
                }
                else
                    next(err);
			}, function(err) {
				next(err);
			});
			
		});
		
	});
	
	// Load the current category filter
	view.on('init', function(next) {
		
		if (req.params.category) {
			keystone.list('PostCategory').model.findOne({ name: locals.filters.category }).exec(function(err, result) {
				locals.data.category = result;
				next(err);
			});
		} else {
			next();
		}
		
	});
	
	// Load the posts
	view.on('init', function(next) {
        if(locals.data.category&&locals.data.category.type==='单独页面')//单独页面无posts
            return next();
		var q = keystone.list('Post').paginate({
				page: req.query.page || 1,
				perPage: 10,
				maxPages: 10
			})
			.where('state', '已发布')
			.sort('-publishedDate')
			.populate('author categories');
		
		if (locals.data.category) {
			q.where('categories').in([locals.data.category]);
		}
		
		q.exec(function(err, results) {
			locals.data.posts = results;
			next(err);
		});
		
	});
	
	// Render the view
	view.render('blog');
	
};
