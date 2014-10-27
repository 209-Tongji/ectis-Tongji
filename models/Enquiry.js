var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Enquiry Model
 * =============
 */

var Enquiry = new keystone.List('Enquiry', {
	nocreate: true,
	noedit: true,
});

Enquiry.add({
	name: {label:'姓名', type: Types.Name, required: true },
	email: {label:'电子邮箱', type: Types.Email, required: true },
	phone: {label:'电话号码', type: String },
	enquiryType: {label:'类型', type: Types.Select, options: [
		{ value: 'message', label: "留一些话" },
		{ value: 'question', label: "我有一些问题" },
		{ value: 'other', label: "其他" }
	] },
	message: {label:'内容', type: Types.Markdown, required: true },
	createdAt: {label:'时间', type: Date, default: Date.now }
});

Enquiry.schema.pre('save', function(next) {
	this.wasNew = this.isNew;
	next();
})

Enquiry.schema.post('save', function() {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});

Enquiry.schema.methods.sendNotificationEmail = function(callback) {
	
	var enqiury = this;
	
	keystone.list('User').model.find().where('isAdmin', true).exec(function(err, admins) {
		
		if (err) return callback(err);
		
		new keystone.Email('enquiry-notification').send({
			to: admins,
			from: {
				name: 'tjproject',
				email: 'contact@tjproject.com'
			},
			subject: 'New Enquiry for tjproject',
			enquiry: enqiury
		}, callback);
		
	});
	
}

Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'name, email, enquiryType, createdAt';
Enquiry.register();
