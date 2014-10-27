var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * PostCategory Model
 * ==================
 */

var PostCategory = new keystone.List('PostCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
    label:'文档分类/单独页面'
});

PostCategory.add({
	name: {label:'名称', type: String, required: true,unique:true,index:true},
    priority: {label:'优先级',type: Number ,required:true,index:true,default: 0,initial:true},
    type: {label: '类型', type: Types.Select, options: '文档分类, 单独页面', default: '文档分类', initial:true,index:true},
    detail: {label: '详细内容', type: Types.Html, wysiwyg: true, height: 400,dependsOn: { type: '单独页面' }}

});

PostCategory.relationship({ ref: 'Post', path: 'categories' });
PostCategory.defaultColumns = 'name,priority,type';

PostCategory.register();
