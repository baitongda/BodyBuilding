var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjcetId = Schema.Types.ObjcetId;


var NewSchema = new Schema({
	/* 关联文档 */
    user: String,
    date:Date,
    fork:Number,
    fav:Number,
    image:String,
    title:String,
    content: String,
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

//关联表的pupulate方法
/*New.findById(id,function (err,movie) {
	Comment
		.find({movie:id})
	   .populate('from','name')  //根据from字段的_id 来取得对应的name
		.exec(function (err,comments) {
			res.render({});
		})
});*/
module.exports = NewSchema;