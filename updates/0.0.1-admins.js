/**
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 * 
 * Alternatively, you can export a custom function for the update:
 * module.exports = function(done) { ... }
 */

exports.create = {
	User: [
		{ 'name.first': 'Admin', 'name.last': 'User', email: 'yaotianyu0512@gmail.com', password: '123456', isAdmin: true }
	],
	PostCategory:[
		{name:'中心概况',priority:3,type:'单独页面',detail:'等待添加'},
		{name:'中心简报',priority:2,type:'单独页面',detail:'等待添加'},
		{name:'制度创新',priority:1,type:'单独页面',detail:'等待添加'},
		{name:'人才培养',priority:0,type:'文档分类'},
		{name:'中心新闻',priority:-1,type:'文档分类'},
		{name:'通知',priority:-2,type:'文档分类'},
		{name:'文件下载',priority:-3,type:'文档分类'}
	]
};

/*

// This is the long-hand version of the functionality above:

var keystone = require('keystone'),
	async = require('async'),
	User = keystone.list('User');

var admins = [
	{ email: 'user@keystonejs.com', password: 'admin', name: { first: 'Admin', last: 'User' } }
];

function createAdmin(admin, done) {
	
	var newAdmin = new User.model(admin);
	
	newAdmin.isAdmin = true;
	newAdmin.save(function(err) {
		if (err) {
			console.error("Error adding admin " + admin.email + " to the database:");
			console.error(err);
		} else {
			console.log("Added admin " + admin.email + " to the database.");
		}
		done(err);
	});
	
}

exports = module.exports = function(done) {
	async.forEach(admins, createAdmin, done);
};

*/
