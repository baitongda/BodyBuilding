var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjcetId = Schema.Types.ObjcetId;

var HotSchema = new mongoose.Schema({
    title:String,
    url:String,
    meta: {
    	createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
    }
});
HotSchema.pre('save',function (next) {
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	next();
});
//关联表的pupulate方法
/*Movie.findById(id,function (err,movie) {
	Comment
    	.find({movie:id})
        .populate('from','name')  //根据from字段的_id 来取得对应的name
        .exec(function (err,comments) {
			res.render({});
		});
});*/

module.exports = HotSchema;
