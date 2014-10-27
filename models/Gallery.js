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
	heroImage: { label:'封面图片',type: Types.CloudinaryImage },
	images: { label:'图片',type: Types.CloudinaryImages }
});

Gallery.register();
