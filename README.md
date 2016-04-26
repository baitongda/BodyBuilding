# BodyBuiding
基于Express4.x 和 Mongodb 的健身网站<br/>
### 前期准备
    安装npm [如何安装](http://jingyan.baidu.com/article/a17d528506d7f58098c8f2b0.html)
    安装express<br/>
    我们安装4.0，这里有个需要注意的问题在4.x版本express 已经把命令行工具分离出来<br/>
    [express-generator](https://github.com/expressjs/generator)
    现在全局安装只需要安装这个命令行工具就可以，指令如下：
  ```
  npm install -g express-generator
  ```
### 创建项目
生成一个express项目:,并安装一些将来要用的模块 <br/>
```
  $ express nodeApp
  $ cd nodeApp && npm install
  $ npm install mongoose underscore moment supervisor bcryptjs --save
```
    现在的目录是这样的,需要新建一个目录<br>
![](https://github.com/sun124361111/BodyBuilding/blob/master/public/images/1.jpg)
### 开始搞起
打开routes下的index.js 为项目添加路由,它可能是这样的:<br/>
``` js
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  // some db datas ...
  // ...
});
module.exports = router;
```
    这样的代码将路由和数据处理的逻辑混杂在一起,后期将会变得难以维护,并且也没有实现MVC的思想,三者分离和代码复用,所有我们之前创建的app目录就起到了作用,我们将业务逻辑放到controllers里,再细分为处理某种数据的,这样,代码就简洁的多了<br/>
    我们先尝试在controllers里写点东西:新建 `index.js`文件
``` js
exports.index = function (req,res) {
	res.render('index',{title:'Index Page'});
}
```
    在路由文件`/routes/index.js`中引用他
``` js
var Index = require('../app/controllers/index');
router.get('/', Index.index);
```
    由于方便测试,我们选择了自动重启工具 supervisor(前边已经安装了),Express 4.x 将入口文件移到了 'bin'目录下的 'www'中,所以,我们需要:
```
$ supervisor bin/www
```
    默认是3000端口,打开浏览器,输入'http://localhost:3000/',我们的服务器就成了!
![](https://github.com/sun124361111/BodyBuilding/blob/master/public/images/2.jpg)
#### 前端代码和js库
    这里我们使用jquery和bootstrap,可以使用[bower](http://bower.io/)来进行管理,也可以直接复制粘贴一份,此外,我们的脚本文件放在public目录下
    再添加一些模块
```
npm install express-session bcryptjs --save
```
    继续,使用session,并且给控制台添加debug,设置模板引擎的位置
```
app.use(session({
    secret:'sunning',
    cookie:{maxAge: 60*1000},
    resave:true,//每次请求都会重新设置cookie
    //是指无论有没有session cookie，每次请求都设置个session cookie ，默认给个标示为 connect.sid
    saveUninitialized: false
   /* store:new mongoStore{
    url:dbURL,
    collection:'sessions'
    }*/
}));
if ('development' === app.get('env')) { //本地开发环境
    app.set('showStackError', true)  //打印错误信息
    app.use(logger(':method :url :status')) //请求类型 地址 状态码
    app.locals.pretty = true; //格式化源码
    mongoose.set('debug', true);
}
app.set('views', path.join(__dirname, '/app/views'));
```
### 开始写界面
    在`app/views/layout/jade`中,开始添加一些默认的脚本
``` jade
doctype html
html
	head
		title= title
		block header
			link(rel='stylesheet', href='/stylesheets/bootstrap.min.css')
			link(rel='stylesheet', href='/stylesheets/style.css')
			script(text='javascript', src='/javascripts/jquery.min.js')
			script(text='javascript', src='/javascripts/bootstrap.min.js')
	body
		block content
		footer#footer
			p.pull-right Copyright © Sun. 2016
```
    由于前端代码较多,就不一一贴代码了,可以在资源里下载,目录结构如下
    ![](https://github.com/sun124361111/BodyBuilding/blob/master/public/images/3.jpg)
### 数据模型的编写
    这里使用mongodb的建模工具--[mongoose](http://www.nodeclass.com/api/mongoose.html)
    打开`app`文件夹,在models和schemas中分别新建文件'users.js'
```js
//app/schemas/user.js
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
```
```js
//app/models/user.js
var mongoose = require('mongoose');

var UserSchema = require('../schemas/user');
var User = mongoose.model('User',UserSchema);

module.exports = User;
```
    user模型中可能还需要其他字段,我们用时再添加
    连接数据库`app.js`  `mongoose.connect('mongodb://localhost/body');`
#### 注册`routes/index.js`
```
router.post('/signup',User.signup);
```
`app/controllers/user.js`
```js
var User = require('../models/user');

exports.signup = function (req,res) {
	var _user = req.body.user;
	if(_user.password !== _user.conPassword){
		res.render('error',{message:'两次输入的密码不同!'})
	}else{
		User.findOne({username:_user.name},function (user,err) {
			if(err) return console.log(err);
			if(user){
				return res.end('用户已存在');
			}else{
				var user = new User(_user);
				user.save(function () {
					if (err) return console.log(err);
					req.session.user = user;
                	res.redirect('/');
				});
			}
		});
	}
	
}
```
