var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

var Gallery = new keystone.List('Gallery', {
	autokey: { from: 'name', path: 'key', unique: true },
    label:'图片集'
});

Gallery.add({
	name: { label:'名称',type: String, required: true },
	publishedDate: { label:'发布时间',type: Date, default: Date.now },
	image : {label:'图片', 
		type: Types.LocalFile,
		dest: __dirname+'/../public/files/images',
		prefix: '/files/images',
		allowedTypes:['image/jpeg','image/pjpeg','image/png'],
		datePrefix: 'YYYYMMDDhmmss',
		format: function(item, file){
			return '<img src="/files/images/'+file.filename+'" style="max-width: 300px"><p>'+'/files/images/'+file.filename+'</p>'
		}
	},
	publish :{label:'是否可见',type:Boolean,default:false}

});

Gallery.register();
