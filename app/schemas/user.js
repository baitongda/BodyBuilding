var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;
//声明模型
var UserSchema = new mongoose.Schema({
	name:{
		unique:true,
		type:String
	},
	password:String,
	//	role 
	//	0: normal
	//	1: verified user 邮件激活用户
	//	2: professonal user 高级用户
	//	...
	//  >10 admin
	//  >50 super admin
	role:{
		type:Number,
		default:0
	},
	meta:{
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
//每次存储时都调用该方法
UserSchema.pre('save',function (next) {
	var user = this;
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	//密码加盐
	bcrypt.genSalt(SALT_WORK_FACTOR,function (err,salt) {
		if(err) return next(err);
		bcrypt.hash(user.password,salt,function (err,hash) {
			if(err) return next(err);
			user.password = hash;
			next();
		});
	});
	//继续走存储流程
	//next();
});
//模型方法
UserSchema.statics = {
	fetch:function (cb) {
		//不往查询方法中传递回调函数，这时查询方法不会立即执行查询，而是返回一个query对象，
		//用户可以再在query对象上修改查询条件，直到执行exec(callback)方法；
		return this.find({}).sort('meta.updateAt').exec(cb);
	},
	findById: function (id,cb) {
		return this.findOne({_id:id}).exec(cb);
		//return this.findOne({_id:id},cb)
		
	}
}
//实例方法

UserSchema.methods = {
	comparePassword:function (_password,cb) {
		bcrypt.compare(_password,this.password,function (err,isMatched) {
			if(err) return cb(err);
			cb(null,isMatched)
		})
	}
}
module.exports = UserSchema;