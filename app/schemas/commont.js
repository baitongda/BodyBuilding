var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjcetId = Schema.Types.ObjcetId;

var CommentSchema = new Schema({
	/* 关联文档 */
    movie: {
        type: ObjcetId,
        ref: 'Bbs'
    },
    from: {
        type: ObjcetId,
        ref: 'User'
    },
    to: {
        type: ObjcetId,
        ref: 'User'
    },
    content: String,
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
})
