/**
 * This file contains the common middleware used by your routes.
 * 
 * Extend or replace these functions as your application requires.
 * 
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */

var _ = require('underscore'),
	querystring = require('querystring'),
	keystone = require('keystone');

var result;
keystone.list('PostCategory').model.find().sort('-priority').select('name').exec(function(err, data) {
    result=data;
    console.log("Update Catogorieds");
});

/**
	Initialises the standard view locals
	
	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/

exports.initLocals = function(req, res, next) {
	
	var locals = res.locals;

    locals.navLinks = [
        { label: '中心首页',	href: '/' },
        { label: '联系我们', href: '/contact' },
        { label: '图片集',	href: '/gallery' }

    ];

    for(var i=0;i<result.length;i++)
    {
        locals.navLinks.push({label:result[i].name ,href:'/category/'+result[i].name})
    }




	locals.user = req.user;
	
	next();
	
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {
	
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};
	
	res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length; }) ? flashMessages : false;
	
	next();
	
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function(req, res, next) {
	
	if (!req.user) {
		req.flash('error', '请登陆后访问该页面。');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
	
};
