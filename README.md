# BodyBuiding
基于Express4.x 和 Mongodb 的健身网站<br/>
### 前期准备
安装npm [如何安装](http://jingyan.baidu.com/article/a17d528506d7f58098c8f2b0.html)
安装express<br/>
  我们安装4.0，这里有个需要注意的问题在4.x版本express 已经把命令行工具分离出来<br/>
  [express-generator]（https://github.com/expressjs/generator)
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
![](https://github.com/sun124361111/BodyBuilding/blob/master/image/plmm.jpg)
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
![]()