var keystone = require('keystone');
var async = require('async');
exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
    locals.data = {
        posts: [],
        categories: [],
        galleries:[]
    };

    view.on('init', function(next) {

        var q = keystone.list('PostCategory').model.find().where('type','文档分类').sort('-priority');
        q.exec(function(err, result) {
            if (err || !result.length) {
                return next(err);
            }
            locals.data.categories = result;
            async.each(locals.data.categories, function(category, next) {
                keystone.list('Post').model.find()
                    .where('state', '已发布')
                    .sort('-publishedDate')
                    .select('publishedDate title slug')
                    .where('categories').in([category.id])
                    .limit('6')
                    .exec(function(err, data) {
                        category.briefPosts=data;
                        next(err);

                    });

            }, function(err) {
                next(err);
            });

        });

    });

    view.on('init', function(next) {
        var q = keystone.list('Gallery').model.find().select('name heroImage');
        q.exec(function (err, result) {
            if (err || !result.length) {
                return next(err);
            }
            locals.data.galleries = result;
            next(err);
        });
    });

    // Render the view
	view.render('index');
	
};
